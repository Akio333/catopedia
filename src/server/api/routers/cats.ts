import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { CatData, CatDetails, CatUpload, PostCard } from "~/types";

const getHeaders = {
  "Content-Type": "application/json",
  "x-api-key": process.env.API_KEY ?? "",
};

const postHeaders = {
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

function extractBase64Data(base64String: string): {
  mimeType: string | undefined;
  b64Data: string | undefined;
} {
  const base64Pattern = /^data:(image\/\w+);base64,(.+)$/;
  const match = base64String.match(base64Pattern);

  if (match) {
    const mimeType = match[1];
    const b64Data = match[2];
    return { mimeType, b64Data };
  }

  throw new Error("Invalid base64 string format");
}

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
            headers: getHeaders,
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
          headers: getHeaders,
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

  uploadCat: publicProcedure
    .input(
      z.object({
        image: z.string(),
        breedId: z.string(),
        fileName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { mimeType, b64Data } = extractBase64Data(input.image);
        if (!mimeType || !b64Data) {
          throw new Error("Invalid base64 string format");
        }
        const buffer = Buffer.from(b64Data, "base64");
        const file = new File([buffer], input.fileName, {
          type: mimeType,
        });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("breed_id", input.breedId);
        formData.append("sub_id", "akio333");

        const resp = await fetch(`${API}/images/upload`, {
          method: "POST",
          headers: postHeaders,
          body: formData,
        });

        if (!resp.ok) {
          const errorText = await resp.text();
          console.error("Response error text:", errorText);
          throw new Error(`Failed to upload image: ${resp.statusText}`);
        }

        const data: CatUpload = (await resp.json()) as CatUpload;
        return data;
      } catch (e) {
        throw e;
      }
    }),
});
