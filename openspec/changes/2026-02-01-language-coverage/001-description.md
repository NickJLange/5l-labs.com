# Language Coverage Feature

## Summary
Implement multi-language support where each language (en, ja, es, fr) lives on its own master branch. Translations are pulled from language-specific master branches during publishing.

## Problem Statement
Currently the blog is only in English. To support multiple languages:
- Each language needs its own master branch
- Publishing should pull updates from each language branch
- Spot fixes can be applied manually to each language
- Embeddings should only be updated on publish

## Solution Architecture

### Branch Strategy
```
main (en)          ← English master, can move forward independently
├── ja/master      ← Japanese master branch
├── es/master      ← Spanish master branch
└── fr/master      ← French master branch
```

### Publishing Workflow
1. Pull latest from `main` (English content)
2. Pull latest from `ja/master`, `es/master`, `fr/master` (translations)
3. Build each language variant
4. Deploy to respective paths (`/ja/`, `/es/`, `/fr/`)
5. Generate embeddings only on publish (not during development)

### Manual Spot Fixes
- Apply fixes directly to language-specific master branches
- These are merged into the main workflow during publishing

## Implementation Requirements

### 1. Docusaurus i18n Configuration
- Configure `docusaurus.config.js` for i18n
- Set up locale folders: `i18n/ja`, `i18n/es`, `i18n/fr`
- Configure build command to build each locale

### 2. Git Branch Strategy
- Create `ja/master`, `es/master`, `fr/master` branches
- Document branch naming conventions
- Set up branch protection rules

### 3. Publishing Script
- Update `render.yaml` or CI/CD pipeline
- Script to pull from all language branches
- Build and deploy each locale

### 4. Embeddings Handling
- Update `scripts/generate_embeddings.py`
- Only run on publish (not in dev mode)
- Generate locale-specific embeddings

## Success Criteria
- [ ] English content on `main` branch
- [ ] Japanese content on `ja/master` branch
- [ ] Spanish content on `es/master` branch
- [ ] French content on `fr/master` branch
- [ ] Multi-language build works in CI/CD
- [ ] Embeddings generated only on publish
- [ ] Manual spot fixes can be applied per language

## Non-goals
- Real-time translation (translations are pre-created)
- Automatic translation workflows
- More than 4 languages initially

## Timeline
- Phase 1: Configure Docusaurus i18n
- Phase 2: Create language branches and migrate content
- Phase 3: Update publishing pipeline
- Phase 4: Test and deploy

## Risks
- Content drift between language branches
- Merge conflicts during publishing
- Increased CI/CD time and complexity
