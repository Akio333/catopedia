import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CatData, PostCard } from "~/types";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": process.env.API_KEY || "",
};

const API = "https://api.thecatapi.com/v1",
  DEFAULT_PARAMS =
    "size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC";

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

        const data: CatData[] = await resp.json();
        if (!data) {
          return [];
        }
        const cards: PostCard[] = [];
        data.forEach((item) => {
          const breed = item.breeds[0];
          cards.push({
            id: item.id,
            name: breed?.name || "N/A",
            origin: breed?.origin || "N/A",
            temperment: breed?.temperament || "N/A",
            image: item.url,
          });
        });
        return cards;
      } catch (e) {
        return [];
      }
    }),
});
