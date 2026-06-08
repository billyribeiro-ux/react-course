/* Lesson 10-js-foundations/1400 — Optional chaining & nullish coalescing. */
registerLesson({
  meta: {
    id: "10-js-foundations/1400-optional-chaining-nullish",
    title: "Optional Chaining & Nullish Coalescing",
    part: "10-js-foundations",
    estMinutes: 13,
    level: "intermediate",
    project: "js-foundations",
    lede: "Two small modern operators that prevent a huge share of real-world crashes when data is missing or incomplete — which, with data from servers, is constantly.",
    objectives: [
      "Safely read deep properties with ?.",
      "Provide fallbacks with ?? (and why it beats ||)",
      "Avoid the classic 'cannot read properties of undefined' crash",
      "Combine both for robust data access",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The crash you'll see most often</h2>
      <p>
        Remember <code>TypeError: Cannot read properties of undefined</code>? It happens when you read
        a property of something that doesn't exist — extremely common when data is still loading or a
        field is optional:
      </p>

      ${h.codePane({
        lang: "js",
        title: "The problem",
        editable: true,
        code: `const user = { name: "Ada" }; // no 'address' field

console.log(user.address.city); // 💥 TypeError: Cannot read properties
                                //    of undefined (reading 'city')`,
      })}

      <h2>Optional chaining <code>?.</code></h2>
      <p>
        Put <code>?.</code> before a property access and JavaScript short-circuits to
        <code>undefined</code> if the thing on the left is <code>null</code> or <code>undefined</code> —
        instead of throwing:
      </p>

      ${h.codePane({
        lang: "js",
        title: "The fix",
        editable: true,
        code: `const user = { name: "Ada" };

console.log(user.address?.city);   // undefined — no crash
console.log(user.address?.city ?? "Unknown"); // "Unknown" (see below)

// Works through several levels and on arrays/functions too:
const post = { author: { name: "Ada" } };
console.log(post.author?.avatar?.url); // undefined, safely
console.log(post.comments?.[0]?.text); // undefined, safely
user.save?.();                          // only calls save() if it exists`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Use it deliberately, not everywhere",
        body: `<p><code>?.</code> is perfect when a value is <em>legitimately</em> sometimes-missing
        (optional fields, data still loading). Don't sprinkle it everywhere to silence errors — if a
        value should always exist, a crash that reveals a real bug is more useful than silently getting
        <code>undefined</code> that breaks something subtler downstream. Senior judgment is knowing
        which case you're in.</p>`,
      })}

      <h2>Nullish coalescing <code>??</code></h2>
      <p>
        <code>??</code> provides a fallback <strong>only</strong> when the left side is
        <code>null</code> or <code>undefined</code>. Compare with <code>||</code>, which falls back on
        <em>any</em> falsy value — including valid <code>0</code> and <code>""</code>:
      </p>

      ${h.codePane({
        lang: "js",
        title: "?? vs ||",
        editable: true,
        code: `const count = 0;

console.log(count || 10); // 10  😱 — treated 0 as "missing"
console.log(count ?? 10); // 0   ✅ — 0 is a real value, kept it

const name = "";
console.log(name || "Guest"); // "Guest" — empty string replaced
console.log(name ?? "Guest"); // ""       — empty string kept`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Pick the right fallback operator",
        body: `<p>Use <code>??</code> when <code>0</code>, <code>""</code>, or <code>false</code> are
        <em>valid</em> values you want to keep (quantities, scores, toggles). Use <code>||</code> only
        when any falsy value genuinely means "use the default." Mixing these up causes sneaky bugs like
        a price of 0 turning into 10.</p>`,
      })}

      <h2>The two together</h2>
      ${h.codePane({
        lang: "js",
        title: "Robust access",
        editable: true,
        code: `function getCity(user) {
  return user?.address?.city ?? "City not provided";
}

console.log(getCity({ name: "Ada" }));                      // "City not provided"
console.log(getCity({ address: { city: "London" } }));      // "London"
console.log(getCity(null));                                  // "City not provided"`,
      })}

      ${h.exercise({
        title: "Defensive rendering",
        prompt: `<p>Write a <code>renderUserCard(user)</code> that safely shows
        <code>user?.name ?? "Anonymous"</code>, the city via optional chaining, and a task count that
        keeps a real <code>0</code> using <code>??</code>. Call it with a complete user, a partial one,
        and <code>undefined</code> — it should never crash. This is exactly the resilience real apps
        need when data trickles in from a server.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
