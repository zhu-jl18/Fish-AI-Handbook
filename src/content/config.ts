import { defineCollection, z } from 'astro:content'

/**
 * Tab configuration schema for multi-tab content pages.
 * Used across all chapters to support GitHub-style tab switching.
 * See CONTRIBUTING.md for usage guidelines.
 */
const tabSchema = z.object({
  /** Display label for the tab (defaults to capitalized filename) */
  label: z.string().optional(),
  /** Sort order - lower values appear first (index=0, details=10, others=20+) */
  order: z.number().optional(),
  /** Whether this is the default active tab (index.md is always default) */
  default: z.boolean().optional(),
})

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contributors: z.array(z.string()).optional(),
    /** Optional tab configuration for multi-tab pages (all chapters) */
    tab: tabSchema.optional(),
    /** Internal field set during build - identifies content as non-index tab file */
    _isTabVariant: z.boolean().optional(),
    /** Whether this page uses math notation (KaTeX) - enables conditional CSS loading */
    hasMath: z.boolean().optional(),
  }),
})

const home = defineCollection({
  type: 'content',
  schema: z.object({
    todos: z
      .array(
        z.object({
          text: z.string(),
          href: z
            .string()
            .regex(
              /^(\/|https?:\/\/)/,
              'href must start with "/" or "http(s)://"',
            )
            .optional(),
          meta: z.string().optional(),
        }),
      )
      .default([]),
    readings: z
      .array(
        z.object({
          text: z.string(),
          href: z
            .string()
            .regex(
              /^(\/|https?:\/\/)/,
              'href must start with "/" or "http(s)://"',
            )
            .optional(),
          meta: z.string().optional(),
        }),
      )
      .default([]),
    links: z
      .array(
        z.object({
          text: z.string(),
          href: z
            .string()
            .regex(
              /^(\/|https?:\/\/)/,
              'href must start with "/" or "http(s)://"',
            )
            .optional(),
          meta: z.string().optional(),
        }),
      )
      .default([]),
  }),
})

export const collections = { docs, home }

/** Re-export tab schema type for use in utilities */
export type TabConfig = z.infer<typeof tabSchema>
