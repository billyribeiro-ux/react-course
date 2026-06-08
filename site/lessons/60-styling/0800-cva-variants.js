/* Lesson 60-styling/0800 — Variants with cva & clsx. */
registerLesson({
  meta: {
    id: "60-styling/0800-cva-variants",
    title: "Component Variants with cva & cn()",
    part: "60-styling",
    estMinutes: 15,
    level: "advanced",
    project: "design-system",
    lede: "Real components have variants — primary/secondary, sm/md/lg. class-variance-authority gives you a clean, type-safe way to manage variant-to-class mappings, and cn() resolves conflicts. This is how shadcn components are built.",
    objectives: [
      "Manage class conflicts with clsx + tailwind-merge",
      "Define typed variants with cva",
      "Expose variant props with full type-safety",
      "Build a flexible, overridable component API",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Problem 1: conditional & conflicting classes</h2>
      <p>
        Building class strings by hand gets messy, and conflicting Tailwind utilities (<code>p-2</code> vs
        <code>p-4</code>) don't auto-resolve — the one later in the CSS wins, not the one later in your string.
        The <code>cn()</code> helper (which you built in this project) fixes both with
        <strong>clsx</strong> (conditional joining) + <strong>tailwind-merge</strong> (conflict resolution):
      </p>

      ${h.codePane({
        lang: "ts",
        title: "src/lib/cn.ts",
        readOnly: true,
        code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// cn("px-2 py-1", isActive && "bg-brand", "px-4")
//   → clsx joins conditionally, twMerge makes px-4 win over px-2.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why cn() enables overridable components",
        body: `<p>Because <code>cn()</code> resolves conflicts with "last wins," you can let consumers pass a
        <code>className</code> that <em>overrides</em> your defaults: <code>cn(buttonBase, props.className)</code>.
        A caller can do <code>&lt;Button className="rounded-full"&gt;</code> and it cleanly overrides the
        component's <code>rounded-md</code>. This "open for extension" API is what makes design-system
        components flexible instead of rigid — a hallmark of good component design.</p>`,
      })}

      <h2>Problem 2: managing variants</h2>
      <p>A button has variants (primary/secondary/danger) and sizes (sm/md/lg). Hand-writing the logic is
      error-prone. <strong>class-variance-authority (cva)</strong> declares it cleanly and generates types:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Button with cva",
        readOnly: true,
        code: `import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

const button = cva(
  "inline-flex items-center justify-center rounded-md font-semibold transition-colors disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-fg hover:bg-brand-hover",
        secondary: "border border-border bg-surface hover:bg-bg",
        danger: "bg-danger text-danger-fg",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4", lg: "h-12 px-6 text-lg" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}  // variant & size become typed props!

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Type-safe variants are the whole point",
        body: `<p><code>VariantProps&lt;typeof button&gt;</code> derives the prop types from your cva config —
        so <code>&lt;Button variant="primary" size="lg" /&gt;</code> is autocompleted and typo-checked, and
        <code>variant="purple"</code> is a compile error. The component's API documents itself, callers can't
        misuse it, and adding a variant is one line in one place. This is the Part 20 "derive, don't duplicate"
        principle applied to component styling. It's exactly how shadcn components work under the hood — you've
        now built that machinery yourself.</p>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "Compound variants",
        body: `<p>cva also supports <code>compoundVariants</code> for "when variant is X AND size is Y, add these
        classes" — handy for special-case combinations. And the <code>spread</code> of
        <code>...props</code> plus extending the native element's attributes means your <code>Button</code>
        accepts <code>onClick</code>, <code>type</code>, <code>aria-*</code>, etc. for free. Always spread
        native props so your components feel like real elements.</p>`,
      })}

      ${h.exercise({
        title: "Build a variant-rich component",
        prompt: `<p>Extend the design-system's <code>Button</code> with cva: add an <code>"outline"</code> and
        <code>"ghost"</code> variant, an <code>"icon"</code> size, and a <code>compoundVariant</code> (e.g.
        danger + lg gets extra emphasis). Confirm the variant props are fully typed and that passing a custom
        <code>className</code> correctly overrides defaults via <code>cn()</code>. Build a second component
        (a <code>Badge</code>) the same way to cement the pattern.</p>`,
        runHint: "pnpm --filter design-system dev",
      })}
    </section>
  `,
});
