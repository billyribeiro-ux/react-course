/* Lesson 30-react-fundamentals/1200 — Controlled inputs & forms. */
registerLesson({
  meta: {
    id: "30-react-fundamentals/1200-forms-and-controlled-inputs",
    title: "Forms & Controlled Inputs",
    part: "30-react-fundamentals",
    estMinutes: 18,
    level: "intermediate",
    project: "vite-fundamentals",
    lede: "Forms are where users give your app data. The React way — controlled inputs, where state is the single source of truth — makes inputs predictable and powerful. This pattern is everywhere.",
    objectives: [
      "Build controlled inputs bound to state",
      "Handle text, checkbox, and select inputs",
      "Manage a multi-field form cleanly",
      "Handle submission and validation",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Controlled inputs: state is the source of truth</h2>
      <p>
        In a <strong>controlled input</strong>, the input's value comes <em>from state</em>, and every
        keystroke updates that state. The state and the input are always in sync — React drives the input,
        not the DOM. This is the recommended pattern for almost all forms.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "A controlled text input",
        readOnly: true,
        code: `function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}                               // value FROM state
      onChange={(e) => setQuery(e.target.value)}  // every keystroke → state
      placeholder="Search recipes…"
    />
  );
}
// The loop: type → onChange → setQuery → re-render → input shows new value.
// 'query' always equals what's on screen. One source of truth.`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Why controlled?",
        body: `<p>Because state is the single source of truth, you can do anything with the value instantly:
        filter a list as the user types, validate live, disable the submit button, transform input,
        programmatically clear or prefill. The input can't drift out of sync with your app's data. This
        "single source of truth" principle — one authoritative place for each piece of state — is one of the
        most important ideas in all of software architecture, and forms are where you first feel its
        power.</p>`,
      })}

      <h2>Different input types</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Checkbox, select, number",
        readOnly: true,
        code: `const [vegetarian, setVegetarian] = useState(false);
const [cuisine, setCuisine] = useState("any");
const [maxMinutes, setMaxMinutes] = useState(60);

<input
  type="checkbox"
  checked={vegetarian}                          // checkbox uses 'checked'
  onChange={(e) => setVegetarian(e.target.checked)}
/>

<select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
  <option value="any">Any cuisine</option>
  <option value="italian">Italian</option>
  <option value="thai">Thai</option>
</select>

<input
  type="number"
  value={maxMinutes}
  onChange={(e) => setMaxMinutes(Number(e.target.value))} // strings → number!
/>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Inputs are always strings",
        body: `<p><code>e.target.value</code> is <em>always</em> a string, even for
        <code>type="number"</code>. Convert with <code>Number(...)</code> when you need a number, or your
        math turns into string concatenation (remember <code>"5" + 3</code>?). Also: checkboxes use
        <code>checked</code> (a boolean), text/select use <code>value</code>.</p>`,
      })}

      <h2>A multi-field form with one state object</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Scaling to many fields",
        readOnly: true,
        code: `interface FormState { title: string; minutes: number; vegetarian: boolean; }

function NewRecipeForm({ onAdd }: { onAdd: (r: FormState) => void }) {
  const [form, setForm] = useState<FormState>({
    title: "", minutes: 30, vegetarian: false,
  });

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value })); // typed, generic updater
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;     // basic validation
    onAdd(form);
    setForm({ title: "", minutes: 30, vegetarian: false }); // reset
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title} onChange={(e) => update("title", e.target.value)} />
      <button type="submit">Add recipe</button>
    </form>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "When to graduate to a form library",
        body: `<p>Controlled inputs are perfect to learn on and great for small forms. For big forms with
        complex validation, you'll reach for <strong>React Hook Form + Zod</strong> (Part 70), which reduce
        re-renders and centralize validation. But the controlled-input mental model you're building here is
        the foundation those libraries are built on — and knowing the manual version means you'll use the
        library correctly instead of cargo-culting it.</p>`,
      })}

      ${h.exercise({
        title: "Add an 'Add Recipe' form",
        prompt: `<p>Build a controlled form to add new recipes to your list: a text input for the title, a
        number input for minutes, and a vegetarian checkbox — all bound to a single typed form-state object.
        On submit, validate the title isn't empty, call an <code>onAdd</code> that prepends the new recipe to
        your <code>recipes</code> state (immutably!), and reset the form. You now have a fully interactive
        create flow.</p>`,
        runHint: "pnpm vite",
      })}
    </section>
  `,
});
