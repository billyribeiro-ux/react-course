/* Lesson 30-react-fundamentals/1500 — Component children & slots. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1500-children-and-composition",
    title: "Children & Composition Patterns",
    part: "30-react-fundamentals",
    estMinutes: 16,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "The children prop lets components wrap arbitrary content, enabling flexible, reusable layout components. This composition style is how you avoid prop-drilling and build a real design system.",
    objectives: [
      "Use the children prop to wrap content",
      "Type children with React.ReactNode",
      "Pass JSX through 'slot' props",
      "Prefer composition over configuration",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The <code>children</code> prop</h2>
      <p>
        Whatever you put <em>between</em> a component's tags arrives as a special prop called
        <code>children</code>. This lets a component act as a flexible wrapper without knowing what it
        contains:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A reusable Card",
        readOnly: true,
        code: `function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// Anything between the tags becomes 'children':
function App() {
  return (
    <Card>
      <h3>Pasta</h3>
      <p>Ready in 20 minutes</p>
    </Card>
  );
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "Type children as React.ReactNode",
        body: `<p><code>React.ReactNode</code> is the type for "anything React can render" — JSX, strings,
        numbers, arrays of them, or nothing. It's the correct, idiomatic type for <code>children</code>. You
        can also write <code>{ children }: React.PropsWithChildren</code> or
        <code>PropsWithChildren&lt;MyProps&gt;</code> to add children to an existing props type.</p>`,
      })}

      <h2>Composition beats configuration</h2>
      <p>
        Imagine a <code>Modal</code>. You <em>could</em> give it dozens of props (<code>title</code>,
        <code>body</code>, <code>footerButtons</code>, <code>showClose</code>…). Far better: let callers
        compose what they want inside it.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Configuration (rigid) vs composition (flexible)",
        readOnly: true,
        code: `// 😟 Configuration: endless props, never flexible enough
<Modal title="Delete?" body="Are you sure?" confirmText="Delete"
       cancelText="Cancel" showIcon danger />

// 😎 Composition: caller controls the content entirely
<Modal onClose={close}>
  <h2>Delete recipe?</h2>
  <p>This can't be undone.</p>
  <button onClick={confirm}>Delete</button>
</Modal>`,
      })}

      ${h.callout({
        kind: "principal",
        title: "A foundational design principle",
        body: `<p>"Composition over configuration" is one of the most important ideas in component design.
        Configurable components accrete props forever and never quite fit every case; composable components
        stay simple and flexible because the caller supplies the content. This is how mature design systems
        (and shadcn/ui in Part 60) are built. When you feel tempted to add yet another boolean prop, ask:
        "could this be <code>children</code> or a slot instead?" Usually, yes — and the result is more
        reusable.</p>`,
      })}

      <h2>Multiple "slots" via props</h2>
      <p>When you need several distinct regions, pass JSX through named props — "slots":</p>

      ${h.codePane({
        lang: "tsx",
        title: "Named slots",
        readOnly: true,
        code: `interface LayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode; // the main area
}

function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="layout">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

<Layout sidebar={<Filters />}>
  <RecipeList recipes={visible} />
</Layout>`,
      })}

      ${h.callout({
        kind: "tip",
        title: "This also solves prop-drilling",
        body: `<p>Passing components as <code>children</code> means a parent can render content it doesn't have
        to thread data through. If <code>&lt;Layout&gt;</code> renders <code>{children}</code>, it never
        needs the recipe data — the parent already wired it into the JSX it passed. Composition is often the
        simplest cure for "I'm passing this prop through five layers." We'll formalize the alternatives
        (Context) in Part 40.</p>`,
      })}

      ${h.exercise({
        title: "Build composable layout pieces",
        prompt: `<p>Create a generic <code>&lt;Card&gt;</code> that renders <code>children</code> inside styled
        markup, and refactor your <code>RecipeCard</code> to use it. Then build a <code>&lt;Panel&gt;</code>
        with a <code>header</code> slot prop and <code>children</code> body. Use them to lay out your Recipe
        Finder. Notice how much more reusable these are than single-purpose components — that's composition
        working for you.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
