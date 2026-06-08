/* Lesson 30-react-fundamentals/0500 — Props & typing props. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/0500-props",
    title: "Props: Passing Data to Components",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "beginner",
    project: "vite-fundamentals",
    lede: "Props are how data flows into a component — its inputs. With TypeScript, you type props so React tells you immediately when you pass the wrong thing. This is where components become truly reusable.",
    objectives: [
      "Pass and receive props",
      "Type props with a TypeScript interface",
      "Use destructuring, defaults, and optional props",
      "Understand one-way data flow",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Props are a component's inputs</h2>
      <p>
        Just like a function takes arguments, a component takes <strong>props</strong>. You pass them as
        attributes in JSX, and the component receives them as a single object. This is what makes a
        component reusable — same component, different data:
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "Passing and receiving props",
        readOnly: true,
        code: `// Define a component that accepts props:
function Greeting(props: { name: string }) {
  return <h1>Hello, {props.name}!</h1>;
}

// Pass props like HTML attributes:
function App() {
  return (
    <div>
      <Greeting name="Ada" />
      <Greeting name="Grace" />   {/* same component, reused */}
    </div>
  );
}`,
      })}

      <h2>Type props with an interface</h2>
      <p>The professional pattern: define an interface for the props and destructure them. TypeScript then
      enforces that callers pass the right data:</p>

      ${h.codePane({
        lang: "tsx",
        title: "Typed, destructured props",
        check: false,
        readOnly: true,
        code: `interface RecipeCardProps {
  title: string;
  minutes: number;
  vegetarian?: boolean; // optional (Part 20!)
}

function RecipeCard({ title, minutes, vegetarian = false }: RecipeCardProps) {
  return (
    <article className="card">
      <h3>{title} {vegetarian && "🌱"}</h3>
      <p>Ready in {minutes} minutes</p>
    </article>
  );
}

// Usage — TypeScript checks every prop:
<RecipeCard title="Pasta" minutes={20} vegetarian />
<RecipeCard title="Soup" />          // ❌ Error: 'minutes' is required
<RecipeCard title="Soup" minutes="x" /> // ❌ Error: string not number`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Typed props are a component's contract",
        body: `<p>A props interface documents exactly how a component is used and makes misuse a
        <em>compile error</em> instead of a runtime surprise. When you (or a teammate) use the component,
        the editor autocompletes the props and flags mistakes instantly. This is the single biggest reason
        enterprise React is always TypeScript: components become self-documenting, refactor-safe building
        blocks. Everything you learned about interfaces, optional properties, and defaults in Part 20 pays
        off right here.</p>`,
      })}

      <h2>Passing any kind of data</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Props can be any type",
        readOnly: true,
        code: `interface Recipe {
  id: number;
  title: string;
  tags: string[];
}

interface Props {
  recipe: Recipe;              // an object
  onSelect: (id: number) => void; // a function!
  featured: boolean;
}

function RecipeCard({ recipe, onSelect, featured }: Props) {
  return (
    <article className={featured ? "card featured" : "card"}>
      <h3>{recipe.title}</h3>
      <button onClick={() => onSelect(recipe.id)}>View</button>
    </article>
  );
}`,
      })}

      ${h.callout({
        kind: "note",
        title: "Note: non-string props use { }",
        body: `<p>Strings can be passed in quotes (<code>name="Ada"</code>), but anything else — numbers,
        booleans, objects, arrays, functions — goes in curly braces: <code>minutes={20}</code>,
        <code>recipe={myRecipe}</code>, <code>onSelect={handleSelect}</code>. A bare
        <code>featured</code> with no value is shorthand for <code>featured={true}</code>.</p>`,
      })}

      <h2>One-way data flow</h2>
      ${h.callout({
        kind: "principal",
        title: "Props flow down; they are read-only",
        body: `<p>Data flows in <strong>one direction</strong>: from parent to child via props. A child must
        <strong>never modify its props</strong> — they're read-only inputs. If a child needs to affect the
        parent, the parent passes down a <em>function</em> (like <code>onSelect</code>) that the child
        calls. This "data down, events up" pattern keeps even huge apps predictable: you always know where
        data comes from and who can change it. Mutating props breaks React's model and causes baffling
        bugs — treat them as frozen.</p>`,
      })}

      ${h.exercise({
        title: "Build a reusable RecipeCard",
        prompt: `<p>Create a <code>RecipeCard</code> component with a typed props interface
        (<code>title: string</code>, <code>minutes: number</code>, optional <code>vegetarian?: boolean</code>,
        and an <code>onView: (title: string) =&gt; void</code> callback). Render three different cards from
        <code>App</code>, each with different props, and an <code>onView</code> that logs which card was
        clicked. Try omitting a required prop to feel TypeScript catch it. You've built your first reusable,
        typed component.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
