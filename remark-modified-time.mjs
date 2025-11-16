import { execSync } from 'child_process'

/**
 * Remark plugin to inject last modified time from Git history into frontmatter
 * Based on Astro official recipe: https://docs.astro.build/en/recipes/modified-time/
 *
 * This plugin automatically adds a `lastModified` field to the frontmatter of
 * Markdown/MDX files by querying Git for the last commit timestamp.
 */
export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0]

    try {
      // Execute git command to get last commit timestamp in ISO 8601 format
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`)
      const timestamp = result.toString().trim()

      // Only inject if we got a valid timestamp
      if (timestamp) {
        // Initialize file.data.astro if it doesn't exist
        if (!file.data.astro) {
          file.data.astro = {}
        }
        if (!file.data.astro.frontmatter) {
          file.data.astro.frontmatter = {}
        }
        file.data.astro.frontmatter.lastModified = timestamp
      }
    } catch (error) {
      // Gracefully handle errors (file not in git, git not available, etc.)
      // Do nothing - the file will simply not have a lastModified field
      console.warn(
        `Could not get git timestamp for ${filepath}:`,
        error.message,
      )
    }
  }
}
