/* Lesson 90-mobile/1600 — Submitting to the App Store & Play Store. */
registerLesson({
  meta: {
    id: "90-mobile/1600-store-submission",
    title: "Submitting to the App Store & Play Store",
    part: "90-mobile",
    estMinutes: 13,
    level: "advanced",
    project: "expo-mobile",
    lede: "The final step: getting your app into the stores where users can download it. Learn the submission process, store requirements, review guidelines, and how to avoid the common rejections.",
    objectives: [
      "Submit builds with EAS Submit",
      "Prepare store listings and assets",
      "Pass app review",
      "Plan releases and updates",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Submitting your build</h2>
      <p>
        Once you have a production build (Lesson 15), <strong>EAS Submit</strong> uploads it to App Store Connect
        (Apple) and the Google Play Console:
      </p>

      ${h.codePane({
        lang: "bash",
        title: "EAS Submit",
        readOnly: true,
        code: `eas submit --platform ios       # uploads to App Store Connect
eas submit --platform android   # uploads to Google Play Console

# You'll need developer accounts:
#   Apple Developer Program — $99/year
#   Google Play Developer — $25 one-time`,
      })}

      <h2>The store listing</h2>
      <p>Each store needs a listing before you can publish:</p>
      <ul>
        <li><strong>App name, subtitle, description</strong> — clear, keyword-aware (app-store SEO matters).</li>
        <li><strong>Screenshots</strong> for required device sizes, often with captions.</li>
        <li><strong>App icon</strong> (high-res), category, and age rating.</li>
        <li><strong>Privacy policy URL</strong> and a <strong>privacy "nutrition label"</strong> declaring what data you collect.</li>
      </ul>

      ${h.callout({
        kind: "principal",
        title: "Review is a real gate — design for it",
        body: `<p>Both stores <strong>review every app</strong> (and update) before it goes live — Apple's is
        especially strict. Common rejections: requesting permissions without clear justification, broken/incomplete
        features, missing privacy policy, misleading metadata, crashes on launch, or (for Apple) trying to bypass
        in-app-purchase rules. Read the guidelines before you build, not after you're rejected. Budget time for the
        review cycle (hours to a few days) in your launch plan. Treating store compliance as a first-class
        requirement — privacy, permissions, stability — rather than a last-minute scramble is the professional
        approach. A rejection late in a launch is painful and avoidable.</p>`,
      })}

      <h2>Releasing and iterating</h2>
      ${h.callout({
        kind: "principal",
        title: "Staged rollouts and beta tracks",
        body: `<p>Don't ship to 100% of users at once. Use <strong>TestFlight</strong> (iOS) and Play's
        <strong>internal/closed/open testing tracks</strong> to beta-test with real users first, then do a
        <strong>staged rollout</strong> (release to 5% → 20% → 100%) so a bad bug affects few people and can be
        halted. Combined with <strong>EAS Update</strong> for instant JS hotfixes and your crash monitoring (Sentry,
        Part 80), you have a safety net: catch issues with a small cohort, fix fast, expand confidently. This
        risk-managed release discipline is how mature mobile teams ship — and it's the same "deploy safely, monitor,
        roll back" mindset from web deployment, adapted to the store model.</p>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "Plan for native vs OTA updates",
        body: `<p>Remember: pure JS changes can ship instantly via EAS Update, but anything touching native code (a
        new native module, permissions, the app icon) requires a <strong>new store build and review</strong>. Plan
        your release cadence accordingly — batch native changes, hotfix JS issues OTA. Mixing these up leads to
        either unnecessary store submissions or trying to OTA something that can't be.</p>`,
      })}

      ${h.exercise({
        title: "Prepare for submission",
        prompt: `<p>Prepare LaunchPad Mobile for the stores (even if you don't fully publish): write the listing copy,
        create the required screenshots and an icon, draft a privacy policy, and complete a data-collection
        declaration. If you have developer accounts, run <code>eas submit</code> to TestFlight / Play internal
        testing and invite yourself as a tester. Walk the full path so the real launch holds no surprises.</p>`,
        runHint: "cd projects/expo-mobile && eas submit --platform android",
      })}
    </section>
  `,
});
