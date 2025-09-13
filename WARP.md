# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository. 你必须使用中文回答。

## Project Overview

This is "Fish写给朋友们的AI使用指南" (Fish's AI Usage Guide for Friends) - a static website built with Astro.js that provides comprehensive guidance on using AI tools. The site is designed to be beginner-friendly while covering advanced topics like RAG, multi-agent systems, and AI development workflows.

## Development Commands

### Core Commands
```bash
# Development server with hot reload
npm run dev

# Start development server (alias for dev)  
npm start

# Build static site to dist/
npm run build

# Preview built static site locally
npm run preview

# Format code with Prettier
npm run format

# Run Astro CLI commands
npm run astro
```

### BMad Method Integration
This project uses the BMad Method for AI-driven development planning and execution. Key commands:
```bash
# Refresh BMad documentation (if using Codex integration)
npm run bmad:refresh

# List available BMad agents
npm run bmad:list  

# Validate BMad configuration
npm run bmad:validate
```

## Architecture Overview

### Framework & Technology Stack
- **Framework**: Astro.js v4+ (Static Site Generator)
- **Language**: TypeScript/JavaScript (ES Modules)
- **Content Management**: Astro Content Collections with Markdown
- **Styling**: Component-scoped CSS, no external frameworks
- **Build Output**: Static HTML/CSS/JS files (`output: 'static'`)
- **Deployment Target**: Vercel (configured for https://fish-ai-book.vercel.app)

### Content Architecture
The site uses Astro's Content Collections for organized documentation:

```
src/content/docs/
├── 01-fish-talks/          # Essential AI concepts & terminology
├── 02-basic-usage/         # Tool usage guides (WebChat, CLI, etc.)
├── 05-demos/              # Practical examples and demos  
├── 06-technical-deep-dive/ # Advanced technical content
└── config.ts              # Content collection schema
```

### Page Structure
- **Static Pages**: Built with `.astro` components in `src/pages/`
- **Dynamic Routing**: Uses `[...slug].astro` pattern for content collections
- **Layout System**: Centralized layouts with consistent sidebar navigation
- **Component Architecture**: Modular Astro components for Header, Sidebars, Content layouts

### Key Architectural Patterns

#### Content-First Design
All content is authored in Markdown with frontmatter schema validation:
```yaml
# Required schema for all docs
title: string        # Page title
description: string  # SEO description  
```

#### Navigation System
- **Left Sidebar**: Dynamic navigation generated from content structure
- **Right Sidebar**: Table of contents (headings) for current page
- **Header**: Main section navigation with active state tracking

#### Styling Philosophy
- **Dark Theme**: Black header (#000) with blue accents (#4a9eff)
- **No CSS Framework**: Custom CSS with component scoping
- **Responsive Design**: Mobile-first approach with flexible layouts

## Development Workflow

### Content Creation
1. Add new Markdown files to appropriate `src/content/docs/` subdirectory
2. Include required frontmatter with `title` and `description`
3. Content automatically appears in navigation via Astro's file-based routing

### Component Development
1. Create `.astro` files in `src/components/` for reusable UI elements
2. Use TypeScript for props typing and script logic
3. Scope styles with `<style>` tags in components
4. Import and use in pages or layouts

### Static Asset Handling
- **Images**: Place in `public/` directory, reference with absolute paths
- **Scripts**: Use `src/scripts/` for TypeScript utilities
- **Styling**: Component-scoped CSS or global styles in layouts

## BMad Method Integration

This project is configured for the BMad Method, an AI-driven development methodology:

### Core Configuration
- **Config Location**: `.bmad-core/core-config.yaml`
- **Documentation**: Comprehensive methodology guide in `.bmad-core/user-guide.md`
- **Architecture Documentation**: Detailed in `CLAUDE.md`

### Development Context Files
The dev agent always loads these architecture files:
```yaml
devLoadAlwaysFiles:
  - docs/architecture/coding-standards.md
  - docs/architecture/tech-stack.md  
  - docs/architecture/source-tree.md
```

### Agent Interaction
```bash
# Use BMad agents for development tasks
@pm Create user stories for new feature
@architect Design system architecture  
@dev Implement component with tests
@qa *review {story}  # Quality gate review
```

## Code Standards & Conventions

### File Naming
- **Components**: PascalCase (e.g., `Header.astro`, `LeftSidebar.astro`)
- **Pages**: kebab-case for URLs (e.g., `basic-usage/index.astro`)
- **Content**: kebab-case with meaningful names
- **Scripts**: camelCase TypeScript files

### Formatting Rules (.prettierrc.json)
```json
{
  "semi": false,           # No semicolons
  "singleQuote": true,     # Use single quotes
  "printWidth": 80,        # 80 character line limit
  "tabWidth": 2,          # 2-space indentation
  "useTabs": false        # Use spaces, not tabs
}
```

### Import Conventions
- Use ES modules (`import`/`export`)  
- Relative imports for local components
- Astro-specific imports from `astro:content` for collections

## Site Structure & Navigation

### Main Sections
1. **🐟 Fish Talk (鱼说必看)**: Essential concepts for AI beginners
2. **🛠️ Basic Usage (基础用法)**: Tool usage guides (WebChat, CLI, Editor integration)
3. **💡 Prompts (提示词)**: Prompt engineering techniques and patterns
4. **🚀 Advanced (进阶玩法)**: RAG, multi-agent systems, vector databases
5. **🎮 Demo**: Practical examples and complete implementations  
6. **🔧 Tech (技术向)**: Deep technical content like transformer architecture
7. **🎯 Fun (好玩的)**: Creative AI applications and experiments

### Learning Paths
The site defines multiple learning tracks:
- **Beginner**: WebChat → Third-party clients → Mobile apps
- **Developer**: WebChat → CLI tools → Code editors → Third-party clients  
- **Efficiency-focused**: Direct to third-party clients

## Key Integrations

### Static Site Deployment
- **Target Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Site URL**: https://fish-ai-book.vercel.app

### Content Management
- **Format**: Markdown with YAML frontmatter
- **Schema Validation**: Zod schemas in `src/content/config.ts`
- **Collection-based**: Organized by topic areas for scalable content management

## Development Tips

### Working with Content Collections
- All content must include required frontmatter fields
- Use consistent directory structure for logical navigation
- Test content rendering locally before deployment

### Component Development
- Leverage Astro's partial hydration for interactive components
- Keep styles scoped to avoid conflicts
- Use TypeScript interfaces for props when beneficial

### Performance Considerations  
- Static generation provides excellent performance
- Optimize images before adding to `public/` directory
- Keep JavaScript minimal for faster load times

### Debugging
- Use `npm run dev` for hot reload during development
- Check browser console for hydration issues
- Validate content schema errors in terminal output
