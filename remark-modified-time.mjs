import { getGitLastModifiedIso } from './src/utils/git.ts'

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
    const timestamp = getGitLastModifiedIso(filepath)
    if (timestamp) {
      file.data.astro ??= {}
      file.data.astro.frontmatter ??= {}
      file.data.astro.frontmatter.lastModified = timestamp
    }
  }
}
