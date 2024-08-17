import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { CatData, CatDetails, PostCard } from "~/types";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": process.env.API_KEY ?? "",
};

const API = "https://api.thecatapi.com/v1",
  DEFAULT_PARAMS =
    "size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM";

const mapData = (data: CatData): PostCard => {
  const breed = data.breeds[0];
  return {
    id: data.id,
    breed: breed?.name ?? "N/A",
    origin: breed?.origin ?? "N/A",
    temperment: breed?.temperament ?? "N/A",
    image: data.url,
  };
};

const defaultCatDetails: CatDetails = {
  breed: "",
  adaptability: 0,
  affection_level: 0,
  alt_names: "",
  child_friendly: 0,
  description: "",
  dog_friendly: 0,
  image: "",
  life_span: "",
  origin: "",
  temperment: "",
  shedding_level: 0,
};

export const postCatsRouter = createTRPCRouter({
  images: publicProcedure
    .input(
      z.object({
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const resp = await fetch(
          `${API}/images/search?${DEFAULT_PARAMS}&page=${input.page}&limit=${input.limit}`,
          {
            method: "GET",
            headers: headers,
          },
        );

        const data: CatData[] = (await resp.json()) as CatData[];
        if (!data) {
          return [];
        }
        const cards: PostCard[] = [];
        data.forEach((item) => {
          cards.push(mapData(item));
        });
        return cards;
      } catch (e) {
        return [];
      }
    }),

  findCat: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const resp = await fetch(`${API}/images/${input.id}`, {
          method: "GET",
          headers: headers,
        });

        const data: CatData = (await resp.json()) as CatData;
        if (!data) {
          return defaultCatDetails;
        }

        const breed = data.breeds[0];
        const catDetails: CatDetails = {
          breed: breed?.name ?? "",
          adaptability: breed?.adaptability ?? 0,
          affection_level: breed?.affection_level ?? 0,
          alt_names: breed?.alt_names ?? "",
          child_friendly: breed?.child_friendly ?? 0,
          description: breed?.description ?? "",
          dog_friendly: breed?.dog_friendly ?? 0,
          image: data.url,
          life_span: breed?.life_span ?? "",
          origin: breed?.origin ?? "",
          temperment: breed?.temperament ?? "",
          shedding_level: breed?.shedding_level ?? 0,
        };

        return catDetails;
      } catch (e) {
        return defaultCatDetails;
      }
    }),
});
