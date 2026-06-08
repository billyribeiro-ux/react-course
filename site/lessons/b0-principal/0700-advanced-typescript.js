/* Lesson b0-principal/0700 — Advanced TypeScript. */
registerLesson({
  meta: {
    id: "b0-principal/0700-advanced-typescript",
    title: "Advanced TypeScript Patterns",
    part: "b0-principal",
    estMinutes: 16,
    level: "principal",
    project: "next-saas",
    lede: "The type-system tools that let you build APIs that are impossible to misuse: conditional types, mapped types, template literal types, and branded types. Used judiciously, they encode powerful guarantees.",
    objectives: [
      "Transform types with conditional and mapped types",
      "Use template literal types",
      "Prevent bugs with branded types",
      "Know when advanced types help vs hurt",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Conditional & mapped types</h2>
      ${h.codePane({
        lang: "ts",
        title: "Types that compute",
        readOnly: true,
        code: `// Conditional type: choose a type based on a condition
type Awaited2<T> = T extends Promise<infer U> ? U : T;

// Mapped type: transform every property of a type
type Nullable<T> = { [K in keyof T]: T[K] | null };
type ReadonlyDeep<T> = { readonly [K in keyof T]: ReadonlyDeep<T[K]> };

// Combine for powerful utilities (this is how Partial/Pick are built):
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;`,
      })}

      <h2>Template literal types</h2>
      ${h.codePane({
        lang: "ts",
        title: "Types from string patterns",
        readOnly: true,
        code: `type Color = "red" | "blue";
type Shade = "light" | "dark";
type ColorClass = \`\${Shade}-\${Color}\`;  // "light-red" | "light-blue" | ...

// Type-safe event names, route paths, CSS classes, API endpoints:
type Endpoint = \`/api/\${string}\`;
type EventName = \`on\${Capitalize<string>}\`;`,
      })}

      <h2>Branded types: prevent mixing up values</h2>
      ${h.codePane({
        lang: "ts",
        title: "Make a UserId not assignable to a ProjectId",
        readOnly: true,
        code: `type Brand<T, B> = T & { readonly __brand: B };
type UserId = Brand<number, "UserId">;
type ProjectId = Brand<number, "ProjectId">;

function getUser(id: UserId) { /* ... */ }
const pid = 5 as ProjectId;
getUser(pid); // ❌ ProjectId is not assignable to UserId — caught!
// Without branding, both are just 'number' and easily swapped — a real bug.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Make illegal states unrepresentable",
        body: `<p>The unifying theme of advanced types (and of Part 20's discriminated unions) is <strong>encoding
        invariants in the type system</strong> so that misuse is a compile error, not a runtime bug. Branded types
        stop you passing a user id where a project id is expected. Template literal types make typo'd route/event
        names impossible. Mapped/conditional types let you build precise, self-maintaining APIs. When a library or
        internal API is hard to misuse <em>because the types won't let you</em>, you've eliminated whole categories of
        bugs before they're written. This is type-driven design at a high level.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Restraint is the senior skill here",
        body: `<p>Advanced types are seductive, and it's easy to build a clever type that's <em>incomprehensible</em> —
        error messages become a wall of conditional-type soup, and the next engineer (or you in six months) can't
        understand or modify it. The principal move is <strong>knowing when NOT to</strong>: use advanced types to make
        a <em>public API</em> safer and clearer for its users, but keep them readable, well-named, and documented.
        Cleverness that costs comprehension is a net negative. The goal is fewer bugs and clearer intent, not type-level
        showmanship.</p>`,
      })}

      ${h.exercise({
        title: "Encode an invariant",
        prompt: `<p>In LaunchPad, introduce <strong>branded types</strong> for at least two id types (UserId,
        ProjectId) and update your DAL/functions to use them — then try to pass the wrong id and watch TypeScript catch
        it. Use a <strong>template literal type</strong> somewhere meaningful (typed route paths or event names). Keep
        it readable. You've made a class of bugs impossible to write.</p>`,
        runHint: "pnpm --filter next-saas typecheck",
      })}
    </section>
  `,
});
