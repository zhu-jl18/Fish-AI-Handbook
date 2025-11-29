import { defineCollection, z } from 'astro:content'

/**
 * Tab configuration schema for multi-tab content pages.
 * Currently piloted in the resources chapter.
 * See CONTRIBUTING.md for usage guidelines.
 */
const tabSchema = z
  .object({
    /** Display label for the tab (defaults to capitalized filename) */
    label: z.string().optional(),
    /** Sort order - lower values appear first (index=0, details=10, others=20+) */
    order: z.number().optional(),
    /** Whether this is the default active tab (index.md is always default) */
    default: z.boolean().optional(),
  })
  .optional()

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    contributors: z.array(z.string()).optional(),
    /** Optional tab configuration for multi-tab pages (resources chapter pilot) */
    tab: tabSchema,
    /** Internal field set during build - identifies content as non-index tab file */
    _isTabVariant: z.boolean().optional(),
  }),
})

export const collections = { docs }

/** Re-export tab schema type for use in utilities */
export type TabConfig = z.infer<typeof tabSchema>
