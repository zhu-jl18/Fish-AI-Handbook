import { getGitLastModifiedIso } from '../utils/git.ts'

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
