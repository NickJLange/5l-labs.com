# Embeddings Handling Spec

## Overview
Manage embeddings generation and storage for multi-language content.

## Development vs Publish Mode (Visual)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      EMBEDDINGS WORKFLOW                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                     DEVELOPMENT MODE                                 │    │
│  │  npm run start                                                      │    │
│  │                                                                     │    │
│  │  ┌───────────┐                                                     │    │
│  │  │ Embeddings│───▶ SKIP (use existing submodule)                   │    │
│  │  │  Module   │                                                     │    │
│  │  └───────────┘                                                     │    │
│  │       │                                                             │    │
│  │       ▼                                                             │    │
│  │  ┌───────────┐                                                     │    │
│  │  │   Fast    │───▶ No network calls, instant startup               │    │
│  │  │  Startup  │                                                     │    │
│  │  └───────────┘                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                      PUBLISH MODE                                    │    │
│  │  npm run build:publish                                              │    │
│  │                                                                     │    │
│  │  ┌───────────┐                                                     │    │
│  │  │ PUBLISH_  │───▶ true                                             │    │
│  │  │ MODE=true │                                                     │    │
│  │  └───────────┘                                                     │    │
│  │       │                                                             │    │
│  │       ▼                                                             │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │                    Generate Embeddings                         │ │    │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐          │ │    │
│  │  │  │   EN    │  │   JA    │  │   ES    │  │   FR    │          │ │    │
│  │  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘          │ │    │
│  │  │       │             │             │             │                │ │    │
│  │  │       ▼             ▼             ▼             ▼                │ │    │
│  │  │  ┌─────────────────────────────────────────────────────────┐   │ │    │
│  │  │  │              All Embeddings Generated                    │   │ │    │
│  │  │  └─────────────────────────────────────────────────────────┘   │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │       │                                                             │    │
│  │       ▼                                                             │    │
│  │  ┌───────────┐                                                     │    │
│  │  │   Git     │───▶ Commit & Push submodule changes                │    │
│  │  │ Submodule │                                                     │    │
│  │  └───────────┘                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Current State
The `embeddings/` directory is a git submodule that:
- Gets updated during development
- Is committed to the repository
- Contains vector representations of all blog posts

## New Strategy

### Development Mode
- Embeddings submodule is **not** updated
- Local development uses existing embeddings
- Faster startup time
- No network calls during development

### Publish Mode
- Embeddings are **regenerated** for all content
- Embeddings submodule is updated
- Changes are committed and pushed
- Published site has latest embeddings

## Implementation

### Update scripts/generate_embeddings.py

```python
import os
import json
from pathlib import Path

def should_generate_embeddings():
    """Check if we're in publish mode."""
    return os.environ.get('PUBLISH_MODE', 'false').lower() == 'true'

def generate_embeddings():
    """Generate embeddings for all blog posts."""
    if not should_generate_embeddings():
        print("Skipping embeddings generation (not in publish mode)")
        return
    
    # Generate embeddings for all locales
    locales = ['en', 'ja', 'es', 'fr']
    
    for locale in locales:
        blog_path = Path(f"blog-applied-{locale}-ml-iot")
        if not blog_path.exists():
            continue
        
        generate_embeddings_for_locale(locale, blog_path)
    
    # Commit and push embeddings
    commit_and_push_embeddings()

def generate_embeddings_for_locale(locale, blog_path):
    """Generate embeddings for a specific locale."""
    for md_file in blog_path.glob("*.md"):
        content = md_file.read_text()
        embedding = generate_embedding(content)
        save_embedding(md_file.stem, embedding, locale)

def save_embedding(post_id, embedding, locale):
    """Save embedding to JSON file."""
    output_dir = Path(f"embeddings/{locale}")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    output_file = output_dir / f"{post_id}.embedding.json"
    output_file.write_text(json.dumps(embedding, indent=2))
```

### Update package.json Scripts

```json
{
  "scripts": {
    "start": "node scripts/generate-latest-post.js && mkdir -p static/embeddings && cp -r embeddings/* static/embeddings/ && docusaurus start",
    "build": "node scripts/generate-latest-post.js && mkdir -p static/embeddings && cp -r embeddings/* static/embeddings/ && docusaurus build",
    "build:publish": "node scripts/generate_embeddings.py && npm run build",
    "serve": "docusaurus serve"
  }
}
```

### Update render.yaml

```yaml
services:
  - type: web
    name: 5l-labs-com
    envVars:
      - key: PUBLISH_MODE
        value: "true"
    buildCommand: |
      git submodule update --init --recursive
      npm install
      npm run build:publish
    startCommand: npm run serve
```

## Directory Structure

```
embeddings/
├── en/
│   ├── post1.embedding.json
│   ├── post2.embedding.json
│   └── ...
├── ja/
│   ├── post1.embedding.json
│   └── ...
├── es/
│   ├── post1.embedding.json
│   └── ...
└── fr/
    ├── post1.embedding.json
    └── ...
```

## Embedding Model

### Current Model
- Uses sentence-transformers/all-MiniLM-L6-v2
- 384-dimensional embeddings
- English-optimized

### Language Support
- all-MiniLM-L6-v2 supports multiple languages but works best on English
- For better multilingual support, consider:
  - paraphrase-multilingual-MiniLM-L12-v2
  - distiluse-base-multilingual-cased-v1

### Recommendation
Start with all-MiniLM-L6-v2 and upgrade if needed. Most embeddings use cases work well enough with this model for multilingual content.

## Git Submodule Configuration

### .gitmodules
```gitmodules
[submodule "embeddings"]
    path = embeddings
    url = https://github.com/5l-labs/embeddings.git
    branch = main
```

### CI/CD Commands
```bash
# Initialize submodule
git submodule update --init --recursive

# Update to latest
git submodule update --remote

# Commit changes
git add embeddings
git commit -m "chore: update embeddings"
git push
```

## Validation Steps
- [ ] Embeddings not generated during `npm run start`
- [ ] Embeddings generated during `npm run build:publish`
- [ ] Each locale has its own embeddings directory
- [ ] Static site serves embeddings correctly
- [ ] Submodule updates on publish
- [ ] Embedding search works for all languages
