# Git Branch Strategy Spec

## Overview
Define the branch strategy for multi-language content management.

## Branch Structure (Visual)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           REPOSITORY STRUCTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         main (English)                              │     │
│  │   • Primary source of all content                                  │     │
│  │   • New posts written in English first                             │     │
│  │   • Moves forward independently                                    │     │
│  │   protected: yes, PRs required                                     │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│                                      │ fetch/pull                           │
│                                      ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         ja/master (Japanese)                        │     │
│  │   • Japanese translations of main content                          │     │
│  │   • Can receive spot fixes directly                                │     │
│  │   protected: yes, PRs required                                     │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│                                      │ fetch/pull                           │
│                                      ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         es/master (Spanish)                         │     │
│  │   • Spanish translations of main content                           │     │
│  │   • Can receive spot fixes directly                                │     │
│  │   protected: yes, PRs required                                     │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                      │                                       │
│                                      │ fetch/pull                           │
│                                      ▼                                       │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │                         fr/master (French)                          │     │
│  │   • French translations of main content                            │     │
│  │   • Can receive spot fixes directly                                │     │
│  │   protected: yes, PRs required                                     │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Linear View
```
main           ┌───┐    ┌───┐    ┌───┐    ┌───┐    ┌───┐
               │ C1│───▶│ C2│───▶│ C3│───▶│ C4│───▶│ C5│
               └───┘    └───┘    └───┘    └───┘    └───┘
                   │        │        │        │        │
                   │        │        │        │        │
ja/master          │    ┌───┐    │        │    ┌───┐
                   │    │ J1│────┘        │    │ J2│
                   │    └───┘             │    └───┘
                   │        │             │        │
es/master         │        │    ┌───┐    │        │
                   │        │    │ S1│────┘        │
                   │        │    └───┘             │
                   │        │        │             │fr/master          │        │        │    ┌───┐    │
                   │        │        │    │ F1│────┘
                   │        │        │    └───┘
```

## Branch Purposes

### main (English)
- Primary branch for English content
- All new posts are written in English first
- Can move forward independently
- Pull requests required for changes
- Protected: no direct pushes

### ja/master, es/master, fr/master
- Language-specific master branches
- Contain translations of content from `main`
- Can receive spot fixes directly (for urgent fixes)
- Protected: no direct pushes except for authorized maintainers
- Merged into `main` workflow during publishing

## Branch Naming Conventions

### Feature Branches (all languages)
```
feature/description          # English feature
feature/ja-description       # Japanese feature
feature/es-description       # Spanish feature
feature/fr-description       # French feature
```

### Hotfix Branches
```
hotfix/issue-description     # English hotfix
hotfix/ja/issue-description  # Japanese hotfix
hotfix/es/issue-description  # Spanish hotfix
hotfix/fr/issue-description  # French hotfix
```

### Release Branches
```
release/YYYY-MM-DD           # English release
release/ja/YYYY-MM-DD        # Japanese release
release/es/YYYY-MM-DD        # Spanish release
release/fr/YYYY-MM-DD        # French release
```

## Content Synchronization

### Initial Content Migration
1. Create language branches from `main`:
   ```bash
   git checkout main
   git checkout -b ja/master
   git checkout -b es/master
   git checkout -b fr/master
   git push origin ja/master es/master fr/master
   ```

2. Remove English content from language branches (keep structure):
   ```bash
   # In each language branch, delete all .md files with English content
   # Keep directory structure for translations
   ```

3. Add placeholder files indicating translations needed

### Ongoing Synchronization
1. When new English content is added to `main`:
   - Create translation issue in project board
   - Assign to translation team
   - Track progress in issue

2. Translations are PR'd into language branches:
   ```bash
   git checkout ja/master
   git checkout -b translate/new-post-title
   # Add translated content
   git add .
   git commit -m "feat: translate new-post-title to Japanese"
   git push origin translate/new-post-title
   # Create PR to ja/master
   ```

### Spot Fixes
For urgent fixes to existing content:
1. Apply fix directly to language branch (if authorized)
2. Create PR for review
3. Merge and deploy

## Branch Protection Rules (GitHub)

### main Branch
- Require pull request reviews: 1
- Require status checks: CI passes
- Restrict pushes: enabled
- Allow force push: disabled

### Language Master Branches (ja/master, es/master, fr/master)
- Require pull request reviews: 1
- Require status checks: CI passes
- Restrict pushes: enabled (for maintainers)
- Allow force push: disabled

## Workflow Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                    Publishing Workflow                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   main ──┐                                                   │
│          │                                                   │
│          ├──► Pull ──► Build ──► Deploy ──► /               │
│          │                                                   │
│   ja/master ──┐                                             │
│               │                                             │
│               ├──► Pull ──► Build ──► Deploy ──► /ja/       │
│               │                                             │
│   es/master ──┼──► Pull ──► Build ──► Deploy ──► /es/       │
│               │                                             │
│   fr/master ──┘                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Validation Steps
- [ ] All language branches created and pushed
- [ ] Branch protection rules configured
- [ ] CI/CD pipeline builds all locales
- [ ] Test publishing workflow
