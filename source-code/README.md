# Oronix — Editable source

This is the editable React + Vite source for the ready-to-upload website in the parent folder. Visitors do not use these files or run commands. The parent folder already contains the compiled index.html and website assets.

For future edits, use Node 22.13+ and pnpm 11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm build
```

Copy the contents of the resulting `dist` folder over the website files at the repository root, then commit them. GitHub Pages publishes the committed static files automatically. The Vite relative base `./` supports root domains and repository URLs without a repository-name setting.

Page content/3D/interactions: app/page.tsx. Styling: app/globals.css. Contact recipient: lib/contact-delivery.ts. Images/logos: public. Font and vendor licenses are included.

The contact form submits directly to FormSubmit for oronixdesign@gmail.com. The owner must activate the form from that inbox and verify delivery using a test from the final URL. There is no separate inquiry database in this static edition.
