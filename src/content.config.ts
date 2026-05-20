import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const FAQ = defineCollection({
  loader: file("src/data/FAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

export const collections = {
  FAQ,
};
