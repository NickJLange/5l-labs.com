# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is the 5L Labs company website (5l-labs.com), built with Docusaurus 2. The site focuses on "Commercial Privacy First" and covers two main areas: Private AI/ML and Private IoT. It's deployed on Render.com with automatic preview deployments for pull requests.

## Architecture

### Core Technology Stack
- **Framework**: Docusaurus 2 (React-based static site generator)
- **Language**: JavaScript/TypeScript with JSX/TSX components
- **Styling**: CSS Modules + custom CSS
- **Deployment**: Render.com (configured via `render.yaml`)
- **Package Manager**: npm/yarn (both supported, bun.lock suggests Bun is also used)

### Site Structure
- **Main Blog** (`/blog/`) - Private AI/ML content  
- **Private IoT Blog** (`/privatehome/`) - Configured as separate blog instance via Docusaurus plugin
- **Docs** (`/docs/`) - Consulting services documentation
- **Homepage** - Custom React landing page

### Multi-Blog Architecture
The site uses Docusaurus's multi-instance blog plugin to support separate blog sections:
- Primary blog in `/blog/` directory for AI/ML content
- Secondary "privatehome" blog in `/blog-privatehome/` for IoT content  
- Third misc blog in `/blog-misc/` 

This is configured in `docusaurus.config.js` with the `@docusaurus/plugin-content-blog` plugin using different `id` and `routeBasePath` settings.

### Custom Components
- `HomepageFeatures` - Landing page feature cards
- `FeaturesFromYaml` - Dynamic feature loading from YAML
- `MDXComponents` - Custom MDX component overrides
- Custom theme components in `src/theme/`

### Internationalization
Supports multiple locales (English and Japanese) configured in `docusaurus.config.js`.

## Common Development Commands

### Setup and Development
```bash
# Install dependencies
yarn install
# or
npm install

# Start development server (opens browser automatically)
yarn start
# or  
npm run start

# Build for production
yarn build
# or
npm run build

# Serve production build locally
yarn serve
# or
npm run serve

# Clear cache and generated files
yarn clear
# or
npm run clear
```

### Deployment and Preview
```bash
# Deploy to GitHub Pages (if configured)
yarn deploy
# or with SSH
USE_SSH=true yarn deploy

# Preview deployment (requires .env file with PUSH_URL and RENDER_SERVICE)
./preview.sh
```

### Content Management
```bash
# Generate translation files
yarn write-translations

# Generate heading IDs for existing content
yarn write-heading-ids

# Customize Docusaurus components
yarn swizzle
```

### Embedding Generation
The site includes a custom embedding generation system for AI-powered content search:

```bash
# Generate embeddings for site content (requires Ollama or OpenAI-compatible API)
cd scripts/
python3 generate_embeddings.py
```

This script:
- Fetches all URLs from the sitemap
- Generates embeddings using configurable models (default: nomic-embed-text:v1.5)
- Outputs to `embeddings.json` for vector search capabilities
- Supports both local Ollama and remote OpenAI-compatible APIs

Configuration is managed in `scripts/config.toml`.

## Development Workflow

### Adding Blog Posts
1. **Main blog** (AI/ML): Add `.md` files to `/blog/` directory
2. **IoT blog**: Add `.md` files to `/blog-privatehome/` directory  
3. **Misc blog**: Add `.md` files to `/blog-misc/` directory

Files should follow Docusaurus blog naming conventions: `YYYY-MM-DD-post-name.md`

### Adding Documentation
Add `.md` files to `/docs/` directory. Sidebar is auto-generated from folder structure via `sidebars.js`.

### Customizing Components
- React components in `src/components/`
- Page-specific components in `src/pages/`
- Theme overrides in `src/theme/`
- Global styles in `src/css/custom.css`

### Deployment
The site auto-deploys via Render.com when changes are pushed to the `main` branch. Pull requests trigger preview deployments. Configuration is in `render.yaml` with Node.js 18.17.0.

## Key Configuration Files
- `docusaurus.config.js` - Main Docusaurus configuration including themes, plugins, and navigation
- `sidebars.js` - Documentation sidebar configuration  
- `package.json` - Dependencies and npm scripts
- `render.yaml` - Render.com deployment configuration
- `scripts/config.toml` - Embedding generation configuration

## Important Notes
- The site supports Mermaid diagrams via `@docusaurus/theme-mermaid`
- Google Analytics tracking is configured (ID: G-P85W9ZNZTP)
- Custom sitemap generation excludes pagination pages
- Uses Iconify React for custom icons
- Node.js 18+ required (specified in package.json engines)
