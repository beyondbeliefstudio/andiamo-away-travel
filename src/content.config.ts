import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  loader: file("src/data/reviews.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      stars: z.string(),
      location: z.string(),
      description: z.string(),
      isFeatured: z.boolean(),
    }),
});

const services = defineCollection({
  loader: file("src/data/services.json"),
  schema: ({ image }) =>
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      cta: z.string(),
      href: z.string(),
    }),
});

const aboutFAQ = defineCollection({
  loader: file("src/data/aboutFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

export const collections = {
  reviews,
  services,
  aboutFAQ,
};
