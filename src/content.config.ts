import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const aboutFAQ = defineCollection({
  loader: file("src/data/aboutFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const reviews = defineCollection({
  loader: file("src/data/reviews.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      stars: z.number(),
      description: z.string(),
      isFeatured: z.boolean(),
    }),
});

export const collections = {
  aboutFAQ,
  reviews,
};
