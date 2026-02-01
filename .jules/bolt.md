## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-24 - Client-side Routing and Hydration
**Learning:** Replacing `<a>` tags with Docusaurus `<Link>` components for internal links enables client-side routing, avoiding full page reloads. Also, explicitly setting the locale in `toLocaleDateString` prevents hydration mismatches between server (Node.js) and client (Browser).
**Action:** Use `<Link>` for all navigation and always define a locale for date formatting.

## 2025-05-24 - Build Dependencies in Production
**Learning:** Render sets `NODE_ENV=production` by default, skipping `devDependencies`. Docusaurus build scripts and plugins (like gray-matter, tailwindcss, postcss) must be in `dependencies` to function during the build on Render.
**Action:** Always move build-time tools to `dependencies` if they are required for the production build command.

## 2025-05-24 - Lockfile Conflicts on Render
**Learning:** Render may fail if conflicting lockfiles (e.g.,  vs ) exist. Always remove unused lockfiles to ensure the correct package manager (npm <command>

Usage:

npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview

All commands:

    access, adduser, audit, bugs, cache, ci, completion,
    config, dedupe, deprecate, diff, dist-tag, docs, doctor,
    edit, exec, explain, explore, find-dupes, fund, get, help,
    help-search, init, install, install-ci-test, install-test,
    link, ll, login, logout, ls, org, outdated, owner, pack,
    ping, pkg, prefix, profile, prune, publish, query, rebuild,
    repo, restart, root, run, sbom, search, set, shrinkwrap,
    star, stars, start, stop, team, test, token, undeprecate,
    uninstall, unpublish, unstar, update, version, view, whoami

Specify configs in the ini-formatted file:
    /home/jules/.npmrc
or on the command line via: npm <command> --key=value

More configuration info: npm help config
Configuration fields: npm help 7 config

npm@11.7.0 /home/jules/.nvm/versions/node/v22.22.0/lib/node_modules/npm) is used consistently.
**Action:** Deleted .

## 2025-05-24 - Lockfile Conflicts on Render
**Learning:** Render may fail if conflicting lockfiles (e.g. bun.lock vs package-lock.json) exist. Always remove unused lockfiles to ensure the correct package manager (npm) is used consistently.
**Action:** Deleted bun.lock.
