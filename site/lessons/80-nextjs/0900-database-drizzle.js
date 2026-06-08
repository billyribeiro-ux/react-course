/* Lesson 80-nextjs/0900 — Database with Drizzle + Postgres. */
registerLesson({
  meta: {
    id: "80-nextjs/0900-database-drizzle",
    title: "Database with Drizzle + Postgres",
    part: "80-nextjs",
    estMinutes: 20,
    level: "advanced",
    project: "next-saas",
    lede: "A real SaaS needs a real database. Drizzle is a TypeScript-first ORM: you define your schema in TypeScript, get full type safety on every query, and use a SQL-like API. Paired with Postgres, it's a 2026 standard.",
    objectives: [
      "Define a database schema with Drizzle",
      "Run type-safe queries and migrations",
      "Connect Postgres to your Next.js app",
      "Understand ORMs and migrations",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>What an ORM does</h2>
      <p>
        A database stores your data persistently. An <strong>ORM</strong> (Object-Relational Mapper) lets you
        work with it from code using typed objects instead of raw SQL strings. <strong>Drizzle</strong> is
        TypeScript-first: your schema is TypeScript, and every query is fully typed — wrong column names and type
        mismatches are compile errors.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Define the schema (src/db/schema.ts)",
        readOnly: true,
        code: `import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  budget: integer("budget").notNull().default(0),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Infer the row type from the schema — single source of truth:
export type Project = typeof projects.$inferSelect;       // a full row
export type NewProject = typeof projects.$inferInsert;    // for inserts`,
      })}

      ${h.codePane({
        lang: "tsx",
        title: "Connect (src/db/index.ts)",
        readOnly: true,
        code: `import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// The connection string is a SERVER-ONLY secret (Lesson 19):
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });`,
      })}

      <h2>Type-safe queries</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Querying",
        readOnly: true,
        code: `import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

// Select — fully typed results:
const all = await db.select().from(projects).orderBy(desc(projects.createdAt));
const one = await db.query.projects.findFirst({ where: eq(projects.id, id) });

// Insert (returns the created row):
const [created] = await db.insert(projects)
  .values({ name: "New", budget: 1000 }).returning();

// Update / delete:
await db.update(projects).set({ archived: true }).where(eq(projects.id, id));
await db.delete(projects).where(eq(projects.id, id));`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why TypeScript-first ORMs won",
        body: `<p>With Drizzle, your schema, your queries, and your application types are <strong>one connected
        system</strong>: rename a column and every affected query is a compile error; a query's result is typed
        exactly to the columns you selected. This catches a huge class of data bugs before runtime. Drizzle in
        particular stays close to SQL (so you're not fighting a heavy abstraction) while giving full type safety —
        which is why it's a top choice in 2026 alongside Prisma. The deeper point: in modern full-stack
        TypeScript, types flow from the database all the way to the UI, and that end-to-end safety is
        transformative.</p>`,
      })}

      <h2>Migrations</h2>
      ${h.codePane({
        lang: "bash",
        title: "drizzle-kit manages schema changes",
        readOnly: true,
        code: `# Generate a migration from your schema changes:
pnpm drizzle-kit generate

# Apply migrations to the database:
pnpm drizzle-kit migrate

# Migrations are versioned SQL files committed to git — your schema's history.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Migrations are version control for your database",
        body: `<p>You never change a production database by hand. <strong>Migrations</strong> are versioned,
        reviewable, repeatable scripts that evolve the schema — so every environment (your laptop, staging, prod)
        and every teammate stays in sync, and changes are auditable and reversible. Treating schema changes with
        the same rigor as code changes (in git, in review, in CI) is non-negotiable at any serious scale.</p>`,
      })}

      ${h.callout({
        kind: "note",
        title: "Getting a Postgres database",
        body: `<p>For local dev you can run Postgres in Docker, or use a free hosted Postgres (Neon, Supabase,
        Vercel Postgres) and put its connection string in <code>.env.local</code> as <code>DATABASE_URL</code>.
        The course's LaunchPad project is structured so you drop in a real <code>DATABASE_URL</code> and the
        Drizzle code works. (Prefer a serverless Postgres for easy deployment in Lesson 20.)</p>`,
      })}

      ${h.exercise({
        title: "Add a real database",
        prompt: `<p>Set up Drizzle in LaunchPad: define a <code>projects</code> schema (and a <code>users</code> one
        you'll use for auth), configure <code>drizzle.config.ts</code> and the db client reading
        <code>DATABASE_URL</code>. Get a free Postgres (Neon/Supabase) or run one in Docker, set
        <code>.env.local</code>, and run <code>drizzle-kit generate</code> + <code>migrate</code>. Replace your
        in-memory data from earlier lessons with real Drizzle queries in your Server Components and Actions.</p>`,
        runHint: "pnpm --filter next-saas exec drizzle-kit generate",
      })}
    </section>
  `,
});
