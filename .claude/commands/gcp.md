---
name: Git Commit & Push
description: Git add all changes, generate conventional commit message according to CONTRIBUTING.md rules, and push to remote branch
category: Git
tags: [git, commit, push, conventional-commits]
---

**Guardrails**
- Always follow Conventional Commits specification as defined in CONTRIBUTING.md
- Generate commit messages in English using imperative mood
- Ensure description is under 72 characters and ends without period
- First letter of each line must be lowercase
- Determine appropriate scope based on changed file paths
- Push only to the current branch's remote counterpart

**Steps**
1. Check current git status and staged changes to understand what has been modified
2. Analyze file paths and change types to determine appropriate commit type and scope:
   - **Content changes** (src/content/docs/**): use `content` type with scope based on chapter (prompts, manual, resources, concepts, etc.)
   - **Component changes** (src/components/**): use `feat` or `fix` with `ui` or component-specific scope
   - **Config changes** (src/config/**): use `config` type
   - **Script changes** (src/scripts/**): use `dx` or `workflow` type
   - **Layout changes** (src/layouts/**): use `ui` or `layout` scope
   - **Style changes** (src/styles/**): use `style` type
   - **Test changes** (tests/**): use `test` type
   - **Documentation changes** (README.md, CONTRIBUTING.md, etc.): use `docs` type
   - **Build/dependency changes** (package.json, astro.config.mjs, etc.): use `build` or `deps` type
3. Generate commit message following format: `[type][scope]: [description in English]`
   - Use imperative mood (e.g., "add feature" not "added feature")
   - Keep description under 72 characters
   - Use lowercase for first letter
   - End without period
4. Execute the git workflow:
   - `git add .`
   - `git commit -m "[generated message]"`
   - Get current branch name
   - `git push origin [current-branch]`
5. Report the actions taken and the generated commit message

**Reference**
- When multiple types of changes are present, use multi-type format like `docs+fix:`
- For cross-module changes affecting multiple areas, omit the scope
- Common scopes: search, sidebar, header, footer, toc, prompts, manual, resources, glossary, routing, navigation, ui, style, seo, deps, build, ci, config
- If unable to determine appropriate type/scope, ask user for clarification before proceeding