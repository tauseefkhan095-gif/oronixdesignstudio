# Oronix Design Studio

The complete Oronix agency website, ready to put in your own Git repository. This standalone edition uses Next.js, React, TypeScript, Tailwind CSS, Radix UI, and Three.js. The production build is a static website, so it can run on a static host without a Node server or database.

It includes the original Oronix logos, expanded blue/cyan/lilac/pink gradients, the interactive 3D orbit, six concept projects with detail dialogs and filters, services, studio/process, FAQ, and both bottom contact and project inquiry forms. Layouts adapt to mobile, tablet, and desktop. The local fonts and image assets are included.

## Run locally

Use Node.js 22.13 or newer and the pnpm version recorded in `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open the localhost URL printed by Next.js. On installations where Corepack is unavailable, install the recorded pnpm version using npm before running the same commands.

```sh
npm install --global pnpm@11.25.0
```

## Build and preview

```sh
pnpm typecheck
pnpm build
pnpm preview
```

The deployable files are created in **`out/`**. Preview opens a local server at `http://127.0.0.1:4173/`. Use `pnpm preview --port 8080` for another port. Do not open the HTML directly from disk: the website and contact service need an HTTP/HTTPS URL.

## Put the project in Git

Extract the ZIP. Open a terminal **inside the `oronix` folder**, where `package.json` is located, then:

```sh
git init
git add .
git commit -m "Add Oronix design agency website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own empty repository. The supplied `.gitignore` excludes dependencies, build output, and local environment files. The archive contains source and brand assets; it contains no account credentials or existing inquiry records.

## Host from your repository

| Host | Build command | Publish/output folder | Setup |
| --- | --- | --- | --- |
| Vercel | `pnpm build` | `out` | Import your Git repository; `vercel.json` is included. |
| Netlify | `pnpm build` | `out` | Import your Git repository; `netlify.toml` is included. |
| Cloudflare Pages | `pnpm build` | `out` | Connect your Git repository and use Node 22.13+. |
| Any static web host | `pnpm build` locally or in CI | Contents of `out` | Upload the generated folder to the site's web root. |

Set the install command to `pnpm install --frozen-lockfile` if the host asks. Select the project folder containing `package.json` as the repository root. A static export uses no `next start` command and needs no API keys.

### GitHub Pages

An optional workflow is supplied in `examples/github-pages.yml`.

1. Copy it to `.github/workflows/deploy-pages.yml` in your repository.
2. In GitHub **Settings → Pages**, choose **GitHub Actions** as the source.
3. Commit and push to `main`.

The workflow uses `/your-repository-name` for a repository site and `/` for a `username.github.io` repository. For a custom domain, change the workflow's path configuration so `NEXT_PUBLIC_BASE_PATH` is blank. Add the domain through GitHub Pages settings.

For a manual build under a subpath, copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_BASE_PATH=/your-repository-name`, and rebuild. Leave this value blank on root-domain deployments. This setting covers both application bundles and public image/logo assets; fonts are bundled into the CSS build.

## Activate the contact email

Both forms send inquiries to **oronixdesign@gmail.com** using FormSubmit's browser AJAX service. The email includes the visitor's name, reply email, company, message, selected service/budget, and inquiry reference. Change the recipient in `lib/contact-delivery.ts`; also update the displayed email and mailto links in `app/page.tsx` if you change it.

After deploying at your final URL:

1. Submit a clearly labelled test inquiry from the live form.
2. Open `oronixdesign@gmail.com`, check Inbox and Spam, and click FormSubmit's activation/confirmation link.
3. Submit another test and confirm that the inquiry reaches Gmail.

Activation is required for email forwarding. A success response from the service confirms submission acceptance, not inbox delivery. Fields remain available if forwarding fails, and a direct email link is available. The portable edition forwards directly to FormSubmit; it does **not** store a separate database backup of inquiries. FormSubmit receives the submitted details to provide email delivery.

Live inbox delivery still needs verification after activation. No activation email is claimed to have been sent during packaging.

## Edit the website

- `app/page.tsx`: project content, page sections, 3D orbit, interactions, and forms.
- `app/globals.css`: colors, gradients, typography, spacing, and responsive styling.
- `app/layout.tsx`: title, description, favicon, and document layout.
- `lib/contact-delivery.ts`: contact recipient and email payload.
- `lib/assets.ts`: optional deployment base path.
- `public/brand/`: original Oronix wordmarks and orbital marks.
- `public/projects/`: project imagery.
- `public/fonts/`: Plus Jakarta Sans font files and license.
- `components/ui/`: the UI components used by the page.

The six portfolio entries are labelled **concepts**. Replace their text and imagery with real client projects when available. Generated concept imagery for Forma and Mono is included. The supplied brand assets are preserved. Dependency licenses remain those of their respective packages; bundled font and vendor-style licenses are included.

## References

- Next.js static exports: https://nextjs.org/docs/app/guides/static-exports
- FormSubmit AJAX: https://formsubmit.co/ajax-documentation
- FormSubmit activation/help: https://formsubmit.co/help
