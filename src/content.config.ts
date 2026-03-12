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
      shortDescription: z.string(),
      features: z.array(z.string()),
      image: image(),
      imageAlt: z.string(),
      cta: z.string(),
      href: z.string(),
      isActive: z.boolean().optional().default(true),
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

const garageDoorRepairFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorRepairDecherdFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairDecherdFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorRepairWinchesterFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairWinchesterFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorRepairTullahomaFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairTullahomaFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorRepairEstillSpringsFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairEstillSpringsFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorRepairLynchburgFAQ = defineCollection({
  loader: file("src/data/garageDoorRepairLynchburgFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const springReplacementFAQ = defineCollection({
  loader: file("src/data/springReplacementFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageInstallationFAQ = defineCollection({
  loader: file("src/data/garageInstallationFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageOpenerRepairFAQ = defineCollection({
  loader: file("src/data/garageOpenerRepairFAQ.json"),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    tag: z.string(),
  }),
});

const garageDoorMaintenanceFAQ = defineCollection({
  loader: file("src/data/garageDoorMaintenanceFAQ.json"),
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
  garageDoorMaintenanceFAQ,
  garageDoorRepairFAQ,
  springReplacementFAQ,
  garageInstallationFAQ,
  garageOpenerRepairFAQ,
  garageDoorRepairDecherdFAQ,
  garageDoorRepairWinchesterFAQ,
  garageDoorRepairTullahomaFAQ,
  garageDoorRepairEstillSpringsFAQ,
  garageDoorRepairLynchburgFAQ,
};
