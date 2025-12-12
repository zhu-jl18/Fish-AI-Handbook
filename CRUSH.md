# Crush Configuration for Fish AI Handbook

This document explains the Crush LSP configuration for the Fish AI Handbook project.

## LSP Servers Configuration

The `.crush.json` configures the following LSP servers:

### Core Language Support

1. **TypeScript** (`typescript-language-server`)
   - Provides type checking, IntelliSense, and refactoring for all `.ts`, `.tsx`, `.astro` files
   - Configured with increased memory limit for large codebases

2. **Astro** (`astro-ls`)
   - Astro-specific language support for `.astro` files
   - Understands Astro's component model and directives

3. **CSS** (`css-languageserver`)
   - CSS completion, validation, and linting
   - Works with `.css`, `.scss`, `.sass` files in `src/styles/`

4. **HTML** (`html-languageserver`)
   - HTML completion and validation
   - Important for Astro component templates

5. **JSON** (`vscode-json-language-server`)
   - JSON schema validation
   - Particularly useful for `package.json`, `tsconfig.json`, `astro.config.mjs`

6. **Emmet** (`emmet-ls`)
   - HTML/CSS abbreviation expansion
   - Accelerates template writing

### Optional/Disabled Servers

- **Markdown** (`markdown-oxide`): Disabled by default, can be enabled if needed
- **ESLint** (`vscode-eslint-language-server`): Disabled as this project uses Prettier

## MCP (Model Context Protocol) Servers

### Filesystem Server
- Provides enhanced file system operations
- Mounted to project root for full context access

### Git Server  
- Git operations and history access
- Enables intelligent commit message generation and code analysis

## Context Configuration

Key files always included in Crush's context:
- Project documentation (`README.md`, `CONTRIBUTING.md`, `CLAUDE.md`, `AGENTS.md`)
- Configuration files (`src/content/config.ts`, `src/config/*.ts`)
- Build configuration (`astro.config.mjs`, `tsconfig.json`, `package.json`)

## Permission Settings

### Allowed by Default
- File read/write operations
- Command execution
- Network access

### Require Confirmation
- Destructive operations (`rm`, `del`)
- Git push operations
- Package publishing

## Usage Notes

1. **Astro Components**: The TypeScript and Astro LSPs work together to provide full IntelliSense for `.astro` files

2. **Content Collections**: The TypeScript server understands the Content Collections schema defined in `src/content/config.ts`

3. **Path Aliases**: The `tsconfig.json` path mapping (`@/`, `@components/`, etc.) is fully supported

4. **Performance**: LSPs are configured with increased memory limits to handle this large documentation project efficiently

5. **Documentation Context**: Crush always has access to the project's documentation files, ensuring it can follow the established patterns and conventions

## Troubleshooting

If LSP servers aren't working:
1. Ensure language servers are installed globally or via npm
2. Check that `typescript-language-server` and `astro-ls` are available in your PATH
3. Restart Crush after modifying the configuration
4. Check `.crush/logs/crush.log` for detailed error information

## Installation Requirements

To use this configuration, install the following LSP servers:

```bash
# TypeScript/JavaScript
npm install -g typescript-language-server

# Astro
npm install -g @astrojs/language-server

# CSS
npm install -g vscode-langservers-extracted

# JSON/HTML (included in vscode-langservers-extracted)

# Emmet
npm install -g emmet-ls

# Optional: Markdown
npm install -g markdown-oxide
```