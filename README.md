This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Image uploads

## Local development

With `npm run dev`, image uploads work without a Vercel account or Blob token. The image files are written to `.local-images/` in the project root, outside `public/`, while the existing local PostgreSQL `Image` table stores their URL, pathname, filename, folder, and customer association. The authenticated `/api/images/:id` route serves the files. `.local-images/` is ignored by Git.

Ensure `DATABASE_URL` in `.env` points to your local PostgreSQL database, then run:

```powershell
npx.cmd prisma db push
npx.cmd prisma generate
npm.cmd run dev
```

`IMAGE_STORAGE=local` may be set in `.env`, but local storage is already the default in development. To test Vercel Blob while running locally, set `IMAGE_STORAGE=blob` and configure the Blob tokens below. Local files are for development only; before deploying, move any images you need to keep to Blob and update their `Image` rows. The app never serves `.local-images/` in production.

## Vercel Blob

Customer profile images use a **public** Vercel Blob store. Passport and NID images use a **private** Vercel Blob store. Connect both stores to the Vercel project and set these server-only environment variables in each deployment environment:

```text
BLOB_READ_WRITE_TOKEN=...          # public store
BLOB_PRIVATE_READ_WRITE_TOKEN=...  # private store
```

The upload API accepts JPEG, PNG, or WebP files up to 4 MB. Files are stored under the folder selected by the reusable `ImageUpload` component. The API creates an unassigned `Image` record, and customer creation associates its ID with the new customer. Private files can be viewed only through the authenticated `/api/images/:id` route.

This project currently synchronizes its Prisma schema with `npx prisma db push`. Run that command against each deployment database after changing the schema, then run `npx prisma generate` for local types. Configure both Blob stores before using the upload form in production.
