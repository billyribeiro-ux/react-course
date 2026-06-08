/* Lesson 00-intro/0300 — How the internet and the web actually work. */
registerLesson({
  meta: {
    id: "00-intro/0300-how-the-web-works",
    title: "How the Internet & the Web Work",
    part: "00-intro",
    estMinutes: 18,
    level: "beginner",
    project: null,
    lede: "React apps run on the web, so you need a rock-solid picture of what happens between typing a URL and seeing a page. This is the model every web engineer carries in their head.",
    objectives: [
      "Distinguish the internet from the web",
      "Trace a request from your browser to a server and back",
      "Explain what URLs, DNS, HTTP, and status codes are",
      "Understand the client/server model that React fits into",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The internet vs. the web</h2>
      <p>
        They're not the same thing. The <strong>internet</strong> is the physical network — cables,
        wifi, cell towers, data centers — that connects billions of computers so they can send each
        other messages. The <strong>web</strong> (World Wide Web) is <em>one thing built on top of</em>
        the internet: a system of interlinked pages and apps you access with a browser. Email, video
        calls, and games also use the internet but aren't "the web."
      </p>

      <h2>Clients and servers</h2>
      <p>Almost everything on the web is a conversation between two roles:</p>
      <ul>
        <li><strong>Client</strong> — the computer <em>asking</em> for something. Your browser is a client.</li>
        <li><strong>Server</strong> — a computer somewhere whose job is to <em>answer</em> requests.
        It "serves" web pages, data, images, and so on.</li>
      </ul>
      <p>
        The client makes a <strong>request</strong>; the server sends back a <strong>response</strong>.
        That request/response cycle is the heartbeat of the entire web — and later, when you build
        full-stack apps in Next.js, <em>you'll be writing the server side of this conversation.</em>
      </p>

      ${h.callout({
        kind: "principal",
        title: "Hold onto 'client' and 'server'",
        body: `<p>This single distinction explains an enormous amount later: why some code runs "on
        the client" (in the browser) and some "on the server", why React added <em>Server Components</em>,
        why secrets must never live in client code. Every advanced topic in this course traces back to
        "which computer is this running on?"</p>`,
      })}

      <h2>What happens when you visit a site</h2>
      <p>Let's trace what happens the instant you type a web address and hit Enter:</p>
      <ol>
        <li>You type a <strong>URL</strong> like <code>https://react.dev/learn</code>.</li>
        <li>Your browser needs the server's numeric address (an <strong>IP address</strong>), so it
        asks <strong>DNS</strong> — the internet's phone book — "what's the IP for react.dev?"</li>
        <li>DNS answers with something like <code>76.76.21.21</code>.</li>
        <li>Your browser sends an <strong>HTTP request</strong> to that IP: "please GET me the page at /learn."</li>
        <li>The server processes it and sends back an <strong>HTTP response</strong>: some HTML, plus a status code.</li>
        <li>Your browser reads the HTML and <strong>renders</strong> it into the page you see. It then fetches any extra files the page needs (CSS, JavaScript, images) the same way.</li>
      </ol>

      <h3>Anatomy of a URL</h3>
      <p>A URL packs several pieces of information. Here's one labeled:</p>

      ${h.codePane({
        lang: "bash",
        title: "A URL, dissected",
        readOnly: true,
        code: `https://shop.example.com/products/42?sort=price#reviews
└─┬─┘   └──────┬───────┘└────┬─────┘└────┬────┘└──┬──┘
scheme      host          path        query   fragment

scheme   → how to talk (https = secure HTTP)
host     → which server (resolved to an IP via DNS)
path     → which resource on that server
query    → extra parameters (after the ?)
fragment → a spot within the page (after the #)`,
      })}

      <h2>HTTP: the language clients and servers speak</h2>
      <p>
        <strong>HTTP</strong> (HyperText Transfer Protocol) is the agreed-upon format for those
        request/response messages. The <code>s</code> in <code>https</code> means it's encrypted, so
        nobody in between can read it. Every request has a <strong>method</strong> describing intent:
      </p>
      <ul>
        <li><strong>GET</strong> — "give me something" (loading a page, fetching data).</li>
        <li><strong>POST</strong> — "here's some new data" (submitting a form, creating an account).</li>
        <li><strong>PUT</strong> / <strong>PATCH</strong> — "update existing data."</li>
        <li><strong>DELETE</strong> — "remove this."</li>
      </ul>
      <p>A simplified request and response look like this:</p>

      ${h.codePane({
        lang: "bash",
        title: "An HTTP exchange (simplified)",
        readOnly: true,
        code: `--- the browser sends ---
GET /products/42 HTTP/1.1
Host: shop.example.com
Accept: text/html

--- the server replies ---
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html> ... the page ... </html>`,
      })}

      <h3>Status codes</h3>
      <p>Every response includes a 3-digit <strong>status code</strong> summarizing what happened:</p>
      <ul>
        <li><strong>2xx — success.</strong> <code>200 OK</code> is the happy path.</li>
        <li><strong>3xx — redirect.</strong> "The thing moved; go here instead."</li>
        <li><strong>4xx — you (the client) messed up.</strong> The infamous <code>404 Not Found</code>, or <code>401 Unauthorized</code>.</li>
        <li><strong>5xx — the server messed up.</strong> <code>500 Internal Server Error</code>.</li>
      </ul>

      ${h.callout({
        kind: "tip",
        body: `<p>Memory aid: <strong>4xx is the client's fault, 5xx is the server's fault.</strong>
        When something breaks later, this instantly tells you which side to investigate.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        body: `<p>A <code>404</code> doesn't mean "the internet is broken" — it means the server is
        working fine and is telling you, correctly, that the specific thing you asked for doesn't
        exist there. Reading the status code saves hours of confused debugging.</p>`,
      })}

      <h2>Where React fits</h2>
      <p>
        For most of this course, React runs <strong>on the client</strong>: the server sends HTML and
        JavaScript, the browser runs the JavaScript, and React builds and updates the interface right
        there in your browser. Later, with Next.js, you'll learn to run React <em>on the server too</em>,
        sending finished HTML for speed and rendering data securely. You now have the map that makes
        all of that make sense.
      </p>

      ${h.exercise({
        title: "Watch the conversation happen",
        prompt: `<p>Open any website in your browser, then open the browser's <strong>Developer
        Tools</strong> (press <kbd>F12</kbd>, or right-click → "Inspect") and click the
        <strong>Network</strong> tab. Reload the page. You'll see every request the page made — the
        HTML, the CSS, images, data. Click one and look at its <strong>status code</strong> and
        <strong>method</strong>. You're now watching the exact request/response cycle you just learned,
        live.</p>`,
        runHint: "",
      })}
    </section>
  `,
});
