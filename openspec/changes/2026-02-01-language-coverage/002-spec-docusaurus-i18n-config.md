# Docusaurus i18n Configuration Spec

## Overview
Configure Docusaurus for multi-language support with English as the primary language.

## Files to Modify
- `docusaurus.config.js` - Add i18n configuration
- `sidebars.js` - Ensure sidebar supports i18n
- `blog-applied-ai-engineering/authors.yml` - Add author translations
- `blog-applied-home-ml-iot/authors.yml` - Add author translations
- `blog-frontier-research/authors.yml` - Add author translations
- `blog-self-hosted-iot/authors.yml` - Add author translations
- `blog-misc/` - Create if missing, add authors.yml

## Configuration Changes

### docusaurus.config.js
Add the following i18n configuration:

```javascript
const languages = ['en', 'ja', 'es', 'fr'];

module.exports = {
  // ... existing config ...

  i18n: {
   en',
    locales defaultLocale: ': languages,
    localeConfigs: {
      en: { label: 'English', direction: 'ltr' },
      ja: { label: '日本語', direction: 'ltr' },
      es: { label: 'Español', direction: 'ltr' },
      fr: { label: 'Français', direction: 'ltr' },
    },
  },

  themeConfig: {
    // ... existing config ...
    
    navbar: {
      items: languages.map(locale => ({
        type: 'locale',
        locale,
        label: locale.toUpperCase(),
      })),
    },
  },
};
```

## Directory Structure
Create the following directory structure:
```
i18n/
├── ja/
│   ├── docusaurus-theme-classic/
│   │   └── theme.json
│   └── code.json
├── es/
│   ├── docusaurus-theme-classic/
│   │   └── theme.json
│   └── code.json
└── fr/
    ├── docusaurus-theme-classic/
    │   └── theme.json
    └── code.json
```

## Blog Post Organization
Each locale will have its own blog posts in `blog/<locale>/`:
```
blog/
├── applied-ai-engineering/          # English (default)
│   └── *.md
├── applied-home-ml-iot/
│   └── *.md
├── applied-home-ml-iot-ja/          # Japanese translations
│   └── *.md
├── applied-home-ml-iot-es/          # Spanish translations
│   └── *.md
└── applied-home-ml-iot-fr/          # French translations
    └── *.md
```

## Translation Workflow
1. Run `npm run write-translations` to extract translatable strings
2. Translate strings in `i18n/<locale>/code.json`
3. Translate navbar, footer, and theme strings in `i18n/<locale>/docusaurus-theme-classic/theme.json`

## Authors Configuration
Update each `authors.yml` to include localized author info:
```yaml
author_key:
  name: "Localized Name"
  title: "Localized Title"
  url: https://github.com/username
  image_url: https://github.com/username.png
```

## Validation Steps
- [ ] Build succeeds with `npm run build`
- [ ] Localized navbar appears
- [ ] Language switcher works
- [ ] Blog posts display correctly per locale
