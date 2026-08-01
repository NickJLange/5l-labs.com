# Publish Workflow Spec

## Overview
Define the CI/CD publishing workflow for multi-language content.

## Publishing Process (Visual)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PUBLISHING WORKFLOW                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  STEP 1: FETCH ALL BRANCHES                                                  │
│  ───────────────────────────                                                 │
│    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐                │
│    │ git fetch│───▶│ git fetch│───▶│ git fetch│───▶│ git fetch│                │
│    │ origin   │    │ origin   │    │ origin   │    │ origin   │                │
│    │ main     │    │ ja/master│    │ es/master│    │ fr/master│                │
│    └─────────┘    └─────────┘    └─────────┘    └─────────┘                │
│          │              │              │              │                      │
│          └──────────────┴──────────────┴──────────────┘                      │
│                                  │                                            │
│                                  ▼                                            │
│  STEP 2: BUILD EACH LOCALE                                                    │
│  ────────────────────────                                                     │
│                                                                              │
│    ┌─────────┐         ┌─────────┐         ┌─────────┐         ┌─────────┐  │
│    │   EN    │         │   JA    │         │   ES    │         │   FR    │  │
│    │ (main)  │         │(ja/master)       │(es/master)       │(fr/master)  │
│    └────┬────┘         └────┬────┘         └────┬────┘         └────┬────┘  │
│         │                   │                   │                   │        │
│         ▼                   ▼                   ▼                   ▼        │
│    ┌─────────┐         ┌─────────┐         ┌─────────┐         ┌─────────┐  │
│    │  build  │         │  build  │         │  build  │         │  build  │  │
│    │  --locale│        │  --locale│        │  --locale│        │  --locale│  │
│    │   en    │         │   ja    │         │   es    │         │   fr    │  │
│    └─────────┘         └─────────┘         └─────────┘         └─────────┘  │
│         │                   │                   │                   │        │
│         └───────────────────┴───────────────────┴───────────────────┘        │
│                                  │                                            │
│                                  ▼                                            │
│  STEP 3: DEPLOY TO RENDER                                                     │
│  ─────────────────────────                                                     │
│                                                                              │
│         ┌──────────────────────────────────────────────────────────┐          │
│         │                    Render Deploy                          │          │
│         │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐          │          │
│         │  │  /en   │  │  /ja   │  │  /es   │  │  /fr   │          │          │
│         │  └────────┘  └────────┘  └────────┘  └────────┘          │          │
│         └──────────────────────────────────────────────────────────┘          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Publishing Process

### Pre-publish (Development)
```bash
# Run development server (English only, no embeddings)
npm run start

# Run with all languages (slow, for testing)
npm run start:i18n
```

### Build Command
```bash
# Build all languages
npm run build

# Or build specific locale
npm run build -- --locale ja
```

### Build with Embeddings (Publish Mode)
```bash
# Only on publish - generates embeddings
npm run build:publish
```

## CI/CD Pipeline (render.yaml)

### Current render.yaml
```yaml
services:
  - type: web
    name: 5l-labs-com
    # ... existing config ...
```

### Updated render.yaml
```yaml
services:
  - type: web
    name: 5l-labs-com
    envVars:
      - key: PUBLISH_MODE
        value: "true"
    buildCommand: |
      git fetch origin ja/master es/master fr/master
      npm install
      npm run build
    startCommand: npm run serve
```

## Publish Script

Create `scripts/publish.sh`:
```bash
#!/bin/bash
set -e

echo "=== 5L Labs Multi-Language Publish ==="

# Fetch all language branches
echo "Fetching language branches..."
git fetch origin main
git fetch origin ja/master
git fetch origin es/master
git fetch origin fr/master

# Checkout each language and build
for locale in en ja es fr; do
  echo "Building $locale..."
  
  if [ "$locale" = "en" ]; then
    branch="main"
  else
    branch="$locale/master"
  fi
  
  git checkout "$branch"
  npm install
  npm run build -- --locale "$locale"
  
  # Output to build/$locale
done

echo "=== Publish complete ==="
```

## Directory Structure After Build
```
build/
├── index.html              # English (en)
├── ja/
│   └── index.html          # Japanese
├── es/
│   └── index.html          # Spanish
└── fr/
    └── index.html          # French
```

## Embeddings Submodule Handling

### Current State
The `embeddings/` directory is a git submodule that gets updated during development.

### New Strategy
1. Embeddings submodule is **not** updated during development
2. Embeddings are **only** generated on publish
3. Submodule is pulled and updated as part of publish pipeline

### Updated render.yaml for Embeddings
```yaml
services:
  - type: web
    name: 5l-labs-com
    envVars:
      - key: PUBLISH_MODE
        value: "true"
    buildCommand: |
      # Initialize/update embeddings submodule only on publish
      git submodule update --init --recursive
      
      # Fetch language branches
      git fetch origin ja/master es/master fr/master
      
      # Install and build
      npm install
      npm run build
    startCommand: npm run serve
```

## Publish Triggers

### Automatic Triggers
- Push to `main` → rebuild English
- Push to `ja/master` → rebuild Japanese
- Push to `es/master` → rebuild Spanish
- Push to `fr/master` → rebuild French

### Manual Triggers
- Manual deploy from Render dashboard
- Tag-based release (v1.0.0)

## Rollback Procedure
1. Go to Render dashboard
2. Select previous successful deploy
3. Click "Redeploy"
4. Verify functionality

## Monitoring
- Check Render deploy logs
- Verify all locales build successfully
- Test language switcher on deployed site

## Validation Steps
- [ ] All language branches build successfully
- [ ] Embeddings generated only on publish
- [ ] Language switcher works
- [ ] URLs resolve correctly (/ja/, /es/, /fr/)
- [ ] Deploy time is acceptable (< 10 minutes)
