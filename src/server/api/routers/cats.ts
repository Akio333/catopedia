import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { CatData, PostCard } from "~/types";

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
});
