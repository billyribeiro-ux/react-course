/* Lesson 10-js-foundations/0500 — Booleans, comparison, truthiness. */
registerLesson({
  meta: {
    id: "10-js-foundations/0500-booleans-and-comparison",
    title: "Booleans, Comparison & Truthiness",
    part: "10-js-foundations",
    estMinutes: 17,
    level: "beginner",
    project: "js-foundations",
    lede: "Decisions in code come down to true or false. Learn comparisons, logical operators, and JavaScript's 'truthiness' rules — plus the single most important equality habit in the language.",
    objectives: [
      "Compare values and combine conditions with && || !",
      "Always use === instead of ==, and know why",
      "Understand truthy and falsy values",
      "Read complex boolean expressions confidently",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Comparisons produce booleans</h2>
      ${h.codePane({
        lang: "js",
        title: "Comparison operators",
        editable: true,
        code: `console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true   (greater than OR equal)
console.log(5 <= 4);   // false
console.log(5 === 5);  // true   (equal?)
console.log(5 !== 3);  // true   (not equal?)`,
      })}

      <h2>Always use <code>===</code>, never <code>==</code></h2>
      <p>
        JavaScript has two equality operators. <code>===</code> ("strict equality") checks that values
        are equal <em>and</em> the same type. <code>==</code> ("loose equality") tries to convert types
        first, with confusing results. <strong>Use <code>===</code> and <code>!==</code> always.</strong>
      </p>

      ${h.codePane({
        lang: "js",
        title: "Why == is dangerous",
        editable: true,
        code: `console.log(5 === "5");  // false  ✅ different types, sensible
console.log(5 == "5");   // true   😱 == converted "5" to 5

console.log(0 == "");    // true   😱
console.log(null == undefined); // true 😱
console.log(0 === "");   // false  ✅ predictable`,
      })}

      ${h.callout({
        kind: "principal",
        title: "A rule with no exceptions for beginners",
        body: `<p>Professional codebases lint against <code>==</code> entirely. Strict equality removes
        an entire category of subtle, hard-to-find bugs. Build the <code>===</code> habit now and you'll
        never have to unlearn <code>==</code>. (There's exactly one niche idiom with <code>==</code> for
        checking null-or-undefined, but you don't need it yet.)</p>`,
      })}

      <h2>Combining conditions: <code>&&</code>, <code>||</code>, <code>!</code></h2>
      <ul>
        <li><strong><code>&&</code> (AND)</strong> — true only if <em>both</em> sides are true.</li>
        <li><strong><code>||</code> (OR)</strong> — true if <em>either</em> side is true.</li>
        <li><strong><code>!</code> (NOT)</strong> — flips true↔false.</li>
      </ul>

      ${h.codePane({
        lang: "js",
        title: "Logical operators",
        editable: true,
        code: `const age = 25;
const hasTicket = true;

console.log(age >= 18 && hasTicket); // true  — both conditions hold
console.log(age < 13 || hasTicket);  // true  — at least one holds
console.log(!hasTicket);             // false — flipped

// Combine freely (use parentheses for clarity):
const canEnter = (age >= 18 && hasTicket) || age >= 65;
console.log(canEnter); // true`,
      })}

      <h2>Truthy and falsy</h2>
      <p>
        Outside of strict comparisons, JavaScript treats every value as either "truthy" or "falsy"
        when a boolean is needed. There's a short list of <strong>falsy</strong> values — memorize it,
        because everything else is truthy:
      </p>

      ${h.codePane({
        lang: "js",
        title: "The 6 falsy values",
        readOnly: true,
        code: `// FALSY (treated as false):
false
0
""        // empty string
null
undefined
NaN

// Everything else is TRUTHY, including:
"0"       // non-empty string → truthy!
[]        // empty array → truthy!
{}        // empty object → truthy!`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>Two classics: an <strong>empty array</strong> <code>[]</code> is <em>truthy</em> (so
        "if the list has items" needs <code>list.length > 0</code>, not just <code>if (list)</code>),
        and the string <code>"0"</code> is <em>truthy</em> even though the number <code>0</code> is
        falsy. These bite everyone once.</p>`,
      })}

      <h2>Short-circuiting (a sneak peek)</h2>
      <p>
        <code>&&</code> and <code>||</code> don't always return <code>true</code>/<code>false</code> —
        they return one of the actual operands, stopping as soon as the answer is known. This powers a
        pattern you'll use in React constantly:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Short-circuit patterns",
        editable: true,
        code: `const name = "";
// || gives the first truthy value — handy for defaults:
console.log(name || "Anonymous"); // "Anonymous"

const user = { name: "Ada" };
// && gives the right side only if the left is truthy:
console.log(user && user.name);   // "Ada"
// In React you'll write:  {isLoggedIn && <Dashboard />}`,
      })}

      ${h.exercise({
        title: "Access-control logic",
        prompt: `<p>Create variables <code>const isLoggedIn = true</code>, <code>const isAdmin = false</code>,
        and <code>let credits = 0</code>. Log booleans for: "can view dashboard" (logged in), "can
        delete users" (logged in AND admin), and "should show buy-more prompt" (credits is falsy).
        Then use <code>||</code> to log a display name that falls back to <code>"Guest"</code> when
        <code>userName</code> is empty.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
