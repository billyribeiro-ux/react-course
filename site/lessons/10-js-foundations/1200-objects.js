/* Lesson 10-js-foundations/1200 — Objects & property access. */
registerLesson({
  meta: {
    id: "10-js-foundations/1200-objects",
    title: "Objects: Structured Data",
    part: "10-js-foundations",
    estMinutes: 19,
    level: "beginner",
    project: "js-foundations",
    lede: "Arrays hold ordered lists; objects hold labeled properties. Together they model essentially all real-world data — and a React component's 'props' are just an object.",
    objectives: [
      "Create objects and read/write properties",
      "Use dot vs bracket notation",
      "Nest objects and arrays to model real data",
      "Add methods and understand the basics of this",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>An object is a bag of labeled values</h2>
      <p>
        Where an array uses numeric positions, an <strong>object</strong> uses named
        <strong>keys</strong>. Each key maps to a value. It's perfect for describing one "thing" with
        several attributes:
      </p>

      ${h.codePane({
        lang: "js",
        title: "Creating an object",
        editable: true,
        code: `const user = {
  name: "Ada Lovelace",
  age: 36,
  isAdmin: true,
  hobbies: ["math", "writing"],
};

console.log(user.name);        // "Ada Lovelace"   (dot notation)
console.log(user["age"]);      // 36               (bracket notation)
console.log(user.hobbies[0]);  // "math"`,
      })}

      <h2>Dot vs bracket notation</h2>
      <p>Use dot notation almost always. Reach for brackets when the key is dynamic (stored in a
      variable) or isn't a valid identifier:</p>

      ${h.codePane({
        lang: "js",
        title: "When you need brackets",
        editable: true,
        code: `const user = { name: "Ada", "favorite color": "purple" };

const field = "name";
console.log(user[field]);          // "Ada"  — key from a variable
console.log(user["favorite color"]); // brackets required (has a space)`,
      })}

      <h2>Adding, changing, removing</h2>
      ${h.codePane({
        lang: "js",
        title: "Mutating objects",
        editable: true,
        code: `const user = { name: "Ada" };

user.age = 36;          // add a new property
user.name = "Ada L.";   // change an existing one
delete user.age;        // remove one

console.log(user);      // { name: "Ada L." }

// Reading a key that doesn't exist gives undefined (not an error):
console.log(user.email); // undefined`,
      })}

      ${h.callout({
        kind: "note",
        title: "const objects mutate too",
        body: `<p>Like arrays, a <code>const</code> object can have its properties changed — you just
        can't reassign the variable to a whole new object. Same "lock the box, not the contents" rule.</p>`,
      })}

      <h2>Nesting: modeling real data</h2>
      ${h.codePane({
        lang: "js",
        title: "Nested structures",
        readOnly: true,
        code: `const post = {
  id: 42,
  title: "Learning JavaScript",
  author: {
    name: "Ada",
    avatar: "ada.png",
  },
  tags: ["js", "beginner"],
  comments: [
    { user: "Grace", text: "Great post!" },
    { user: "Alan",  text: "Thanks!" },
  ],
};

console.log(post.author.name);       // "Ada"
console.log(post.comments[0].text);  // "Great post!"`,
      })}

      ${h.callout({
        kind: "principal",
        title: "This shape IS your app's data",
        body: `<p>Objects-inside-arrays-inside-objects is exactly what an API returns and what your React
        components receive. The data you fetch from a server, the "props" you pass to components, the
        "state" you manage — all of it is this. Get comfortable navigating nested data with dots and
        brackets and you've unlocked the format of the entire web.</p>`,
      })}

      <h2>Methods: functions living on objects</h2>
      ${h.codePane({
        lang: "js",
        title: "Methods & this",
        editable: true,
        code: `const counter = {
  count: 0,
  increment() {          // a method (shorthand for increment: function() {})
    this.count++;        // 'this' refers to the object itself
    return this.count;
  },
};

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.count);       // 2`,
      })}

      <p>The keyword <code>this</code> inside a method refers to the object the method was called on.
      It's a deep topic (next-but-one lesson), but the basic case is intuitive: "this object."</p>

      <h2>Quick tools: <code>Object.keys</code> / <code>values</code> / <code>entries</code></h2>
      ${h.codePane({
        lang: "js",
        title: "Inspecting objects",
        editable: true,
        code: `const scores = { math: 90, science: 85 };

console.log(Object.keys(scores));   // ["math", "science"]
console.log(Object.values(scores)); // [90, 85]
console.log(Object.entries(scores)); // [["math",90],["science",85]]

// entries pairs nicely with for...of:
for (const [subject, score] of Object.entries(scores)) {
  console.log(\`\${subject}: \${score}\`);
}`,
      })}

      ${h.exercise({
        title: "Model your dashboard's user",
        prompt: `<p>Create a <code>user</code> object with <code>name</code>, <code>settings</code>
        (a nested object with <code>theme</code> and <code>notifications</code>), and a
        <code>tasks</code> array of task objects. Write a method <code>addTask(text)</code> that pushes
        a new task using <code>this.tasks</code>. Then render the user's name and task count to the page.
        You're now modeling realistic application state by hand.</p>`,
        runHint: "pnpm js",
      })}
    </section>
  `,
});
