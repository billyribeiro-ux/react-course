/* Lesson 80-nextjs/1300 — File uploads & next/image. */
registerLesson({
  meta: {
    id: "80-nextjs/1300-uploads-images",
    title: "File Uploads & Optimized Images",
    part: "80-nextjs",
    estMinutes: 14,
    level: "advanced",
    project: "next-saas",
    lede: "Real apps handle files — avatars, attachments — and images are often the heaviest thing on a page. Learn the upload pattern and how next/image makes images fast and well-behaved automatically.",
    objectives: [
      "Upload files to object storage",
      "Understand why you don't store files in your DB",
      "Use next/image for automatic optimization",
      "Avoid layout shift and oversized images",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Where files go</h2>
      <p>
        Don't store file <em>contents</em> in your database or your app server's filesystem — both scale poorly.
        Files go in <strong>object storage</strong> (S3, Cloudflare R2, Vercel Blob, Supabase Storage); your
        database stores only the <strong>URL/key</strong> pointing to them.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Upload via a Server Action",
        readOnly: true,
        code: `"use server";
import { put } from "@vercel/blob"; // or an S3 client

export async function uploadAvatar(formData: FormData) {
  const user = await requireUser();
  const file = formData.get("avatar") as File;
  if (!file || file.size > 5_000_000) throw new Error("Invalid file");

  // Upload to object storage, get back a public URL:
  const blob = await put(\`avatars/\${user.id}\`, file, { access: "public" });

  // Store only the URL in your DB:
  await db.update(users).set({ avatarUrl: blob.url }).where(eq(users.id, user.id));
  revalidatePath("/settings");
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The upload patterns",
        body: `<p>Two approaches: (1) <strong>through your server</strong> — the file posts to a Server Action/Route
        Handler which uploads to storage (simple, but the file passes through your server, limited by request
        size). (2) <strong>direct/presigned upload</strong> — your server issues a short-lived signed URL and the
        browser uploads <em>directly</em> to storage (scales to large files, doesn't tie up your server). For
        avatars and small files, (1) is fine; for large media, use (2). Always validate file type and size, and
        scan/limit untrusted uploads — an unrestricted upload endpoint is a real attack vector.</p>`,
      })}

      <h2>next/image: fast images for free</h2>
      ${h.codePane({
        lang: "tsx",
        title: "<Image> vs <img>",
        readOnly: true,
        code: `import Image from "next/image";

// next/image automatically: resizes to the right dimensions, serves modern
// formats (AVIF/WebP), lazy-loads, and reserves space (no layout shift):
<Image
  src={user.avatarUrl}
  alt={\`\${user.name}'s avatar\`}
  width={64}
  height={64}              // width/height prevent layout shift (CLS)
  priority={isAboveFold}   // eager-load critical images
/>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Images are usually the performance bottleneck",
        body: `<p>Unoptimized images are the single biggest cause of slow pages — a 4MB hero image tanks your load
        time. <code>next/image</code> fixes this automatically: it generates appropriately-sized variants, serves
        next-gen formats, lazy-loads off-screen images, and (crucially) reserves layout space so the page doesn't
        jump as images load (good <strong>Cumulative Layout Shift</strong>, a Core Web Vital — Part B0). The
        <code>alt</code> text is also an accessibility requirement, not optional. Using <code>&lt;Image&gt;</code>
        over <code>&lt;img&gt;</code> is one of the highest-ROI performance habits in Next.js.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>For remote images, configure allowed domains in <code>next.config.ts</code>
        (<code>images.remotePatterns</code>) or Next will refuse to optimize them. And always provide
        <code>width</code>/<code>height</code> (or <code>fill</code> with a sized container) to prevent layout
        shift — omitting them reintroduces the very problem the component solves.</p>`,
      })}

      ${h.exercise({
        title: "Add avatars",
        prompt: `<p>Add avatar upload to LaunchPad's settings page: a form posting to an
        <code>uploadAvatar</code> Server Action that validates size/type, uploads to object storage (Vercel Blob
        or an S3-compatible service — or stub it locally), and saves the URL. Display avatars with
        <code>next/image</code> (correct <code>width</code>/<code>height</code> and <code>alt</code>). Check the
        Network tab to see the optimized image formats and lazy loading.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
