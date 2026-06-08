/* Lesson 10-js-foundations/0400 — Strings & template literals. */
registerLesson({
  meta: {
    id: "10-js-foundations/0400-strings",
    title: "Strings & Template Literals",
    part: "10-js-foundations",
    estMinutes: 16,
    level: "beginner",
    project: "js-foundations",
    lede: "Text is everywhere in apps — names, messages, labels, URLs. Master strings: building them, slicing them, and the modern template-literal syntax you'll use constantly in React.",
    objectives: [
      "Create strings and combine them",
      "Use template literals for clean interpolation",
      "Apply the most useful string methods",
      "Understand that strings are immutable",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Three ways to write a string</h2>
      ${h.codePane({
        lang: "js",
        title: "Quotes",
        editable: true,
        code: `const a = "double quotes";
const b = 'single quotes';
const c = \`backticks (template literals)\`;
// All three are strings. Pick one style and stay consistent —
// most teams use double quotes or backticks.`,
      })}

      <h2>Template literals: the modern way</h2>
      <p>
        Backtick strings can <strong>embed values</strong> directly with <code>\${...}</code>. This
        beats gluing strings with <code>+</code> — it's cleaner and supports multiple lines. You'll
        see this everywhere in React.
      </p>

      ${h.codePane({
        lang: "js",
        title: "Interpolation",
        editable: true,
        code: `const name = "Ada";
const age = 36;

// Old way — clumsy:
const old = "Hi " + name + ", you are " + age + ".";

// Template literal — clean:
const greeting = \`Hi \${name}, you are \${age}.\`;

// Expressions work inside \${} too:
const next = \`Next year you'll be \${age + 1}.\`;

console.log(greeting); // Hi Ada, you are 36.
console.log(next);     // Next year you'll be 37.`,
      })}

      ${h.callout({
        kind: "tip",
        body: `<p>Template literals also span multiple lines without tricks — great for building
        messages or HTML. The course platform you're reading right now builds every lesson out of
        multi-line template literals.</p>`,
      })}

      <h2>Useful string properties & methods</h2>
      <p>A <strong>method</strong> is a function attached to a value, called with a dot. Strings have
      many:</p>

      ${h.codePane({
        lang: "js",
        title: "Common operations",
        editable: true,
        code: `const text = "  Hello, World  ";

console.log(text.length);          // 15  (a property, no parentheses)
console.log(text.trim());          // "Hello, World"  (removes edge spaces)
console.log(text.toUpperCase());   // "  HELLO, WORLD  "
console.log(text.toLowerCase());   // "  hello, world  "
console.log("cat".includes("a"));  // true
console.log("cat".replace("c", "b")); // "bat"
console.log("a,b,c".split(","));   // ["a", "b", "c"]  (an array!)`,
      })}

      <h2>Reading individual characters</h2>
      ${h.codePane({
        lang: "js",
        title: "Indexing & slicing",
        editable: true,
        code: `const word = "React";

// Positions start at 0, not 1:
console.log(word[0]);        // "R"
console.log(word[4]);        // "t"
console.log(word.at(-1));    // "t"  (negative counts from the end)

console.log(word.slice(0, 3)); // "Rea"  (from 0 up to, not including, 3)`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Counting starts at zero",
        body: `<p>The first character is position <strong>0</strong>, so the last position is
        <code>length - 1</code>. "Off-by-one" mistakes from forgetting this are a rite of passage —
        and <code>.at(-1)</code> is a friendly modern way to grab the last item without doing the math.</p>`,
      })}

      <h2>Strings are immutable</h2>
      ${h.callout({
        kind: "principal",
        title: "Methods return new strings; they don't change the original",
        body: `<p>String methods like <code>toUpperCase()</code> return a <em>brand-new</em> string and
        leave the original untouched. You must capture the result. This idea — "transform into a new
        value rather than mutate the old one" — is the seed of a huge theme in React, where updating
        state means producing new values, not editing old ones in place.</p>`,
      })}

      ${h.codePane({
        lang: "js",
        title: "Capture the result",
        editable: true,
        code: `let name = "ada";
name.toUpperCase();         // ❌ does nothing useful — result thrown away
console.log(name);          // "ada"

name = name.toUpperCase();  // ✅ capture it
console.log(name);          // "ADA"`,
      })}

      ${h.exercise({
        title: "Build a profile line",
        prompt: `<p>In your dashboard, use a template literal to build and log a one-line bio from
        variables, e.g. <code>\`\${userName} likes \${favoriteColor} and has \${taskCount} tasks.\`</code>.
        Then make a "slug" from a title: take <code>"My First Post"</code>, lowercase it, and
        <code>replaceAll(" ", "-")</code> to get <code>"my-first-post"</code> — the kind of URL slug
        you'll generate in real apps.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
