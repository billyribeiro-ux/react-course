/* Lesson b0-principal/0300 — List virtualization at scale. */
registerLesson({
  meta: {
    id: "b0-principal/0300-virtualization",
    title: "List Virtualization at Scale",
    part: "b0-principal",
    estMinutes: 13,
    level: "principal",
    project: "next-saas",
    lede: "Rendering 10,000 DOM nodes will crawl, no matter how optimized each one is. Virtualization renders only what's visible, keeping huge lists fast. The web counterpart to mobile's FlashList.",
    objectives: [
      "Understand why large lists need virtualization",
      "Virtualize with TanStack Virtual",
      "Handle variable heights and scrolling",
      "Know virtualization's trade-offs",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>The problem at scale</h2>
      <p>
        The browser struggles with thousands of DOM nodes — layout, paint, and memory all degrade. A 10,000-row
        table or an infinite feed rendered fully will jank and bloat memory. <strong>Virtualization</strong> (or
        "windowing") renders only the rows currently visible (plus a small buffer), recycling them as you scroll —
        so the DOM holds ~20 nodes regardless of whether the data is 100 or 100,000 items.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "TanStack Virtual",
        readOnly: true,
        code: `import { useVirtualizer } from "@tanstack/react-virtual";

function BigList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,          // row height
    overscan: 5,                     // render a few extra above/below
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      <div style={{ height: virtualizer.getTotalSize(), position: "relative" }}>
        {virtualizer.getVirtualItems().map((row) => (
          <div key={row.key} style={{ position: "absolute", top: 0,
            transform: \`translateY(\${row.start}px)\`, height: row.size }}>
            {items[row.index].name}      {/* only visible rows exist in the DOM */}
          </div>
        ))}
      </div>
    </div>
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Virtualization is mandatory past a threshold",
        body: `<p>Below ~100 items, virtualization is unnecessary complexity — just render them. Past a few hundred
        (and definitely past a few thousand), it becomes essential: the difference between a smooth 60fps list and a
        frozen tab. <strong>TanStack Virtual</strong> is the headless 2026 standard (you control the markup; it
        computes which rows to render). Recognizing <em>when</em> a list has grown past the threshold — and reaching
        for virtualization before users hit the wall — is the principal-level instinct. It's the same idea as mobile's
        FlashList (Part 90), applied to the web.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Virtualization has costs",
        body: `<p>It complicates the markup (absolute positioning, height calculations), makes variable-height rows
        trickier (dynamic measurement), can interfere with Ctrl+F find-in-page and accessibility if done carelessly,
        and complicates "scroll to item." Use it when you need it, not reflexively. For variable heights, the
        virtualizer measures rows dynamically. Test keyboard navigation and screen-reader behavior — a virtualized
        list must remain accessible.</p>`,
      })}

      ${h.exercise({
        title: "Virtualize a large list",
        prompt: `<p>Build a list of 10,000 items first <em>without</em> virtualization and observe the jank and memory
        in DevTools. Then virtualize it with TanStack Virtual and compare — smooth scrolling, tiny DOM. Inspect the
        Elements panel mid-scroll to see only ~20 rows exist. Verify keyboard scrolling still works. You've made an
        impossible-to-render list trivial.</p>`,
        runHint: "pnpm --filter next-saas dev",
      })}
    </section>
  `,
});
