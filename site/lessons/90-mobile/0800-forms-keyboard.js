/* Lesson 90-mobile/0800 — Forms & keyboard handling. */
registerLesson({
  meta: {
    id: "90-mobile/0800-forms-keyboard",
    title: "Forms & Keyboard Handling",
    part: "90-mobile",
    estMinutes: 13,
    level: "advanced",
    project: "expo-mobile",
    lede: "Forms on mobile have a unique challenge: the on-screen keyboard covers half the screen. Learn TextInput, keyboard avoidance, input types, and reusing React Hook Form + Zod from the web.",
    objectives: [
      "Build forms with TextInput",
      "Handle the keyboard covering inputs",
      "Configure keyboard types and return keys",
      "Reuse React Hook Form + Zod on mobile",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>TextInput</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Controlled text input",
        readOnly: true,
        code: `import { TextInput } from "react-native";
import { useState } from "react";

function NameField() {
  const [name, setName] = useState("");
  return (
    <TextInput
      value={name}
      onChangeText={setName}          // note: onChangeText gives the string directly
      placeholder="Project name"
      keyboardType="default"          // "email-address" | "numeric" | "phone-pad"...
      autoCapitalize="words"
      returnKeyType="done"
      style={{ padding: 12, color: "#fff", borderColor: "#333", borderWidth: 1 }}
    />
  );
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "The right keyboard for the input",
        body: `<p>Set <code>keyboardType</code> to match the field: <code>email-address</code> shows the @ key,
        <code>numeric</code> shows a number pad, <code>phone-pad</code> for phone numbers. Also configure
        <code>autoCapitalize</code>, <code>autoCorrect</code>, <code>secureTextEntry</code> (passwords), and
        <code>textContentType</code> (enables OS autofill for emails, OTPs, passwords). These small touches
        massively improve mobile form UX — typing an email with the wrong keyboard is a daily frustration users
        notice. Attention to these details is what makes an app feel polished and considerate.</p>`,
      })}

      <h2>Keyboard avoidance</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Don't let the keyboard cover the input",
        readOnly: true,
        code: `import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
  <ScrollView keyboardShouldPersistTaps="handled">
    {/* form fields — the view shifts up so the focused input stays visible */}
  </ScrollView>
</KeyboardAvoidingView>`,
      })}

      ${h.callout({
        kind: "gotcha",
        title: "The keyboard-covers-the-input problem",
        body: `<p>By default, the on-screen keyboard slides up <em>over</em> your form, often hiding the very input
        being typed. <code>KeyboardAvoidingView</code> (with platform-specific <code>behavior</code>) shifts
        content up. It's finicky across platforms — many teams use a library like
        <code>react-native-keyboard-controller</code> for robust handling. Either way, <strong>always test forms
        with the keyboard open on a real device</strong>; this issue is invisible in a quick simulator glance and
        very visible to users.</p>`,
      })}

      <h2>Reusing React Hook Form + Zod</h2>
      ${h.callout({
        kind: "principal",
        title: "Your web form skills transfer",
        body: `<p><strong>React Hook Form and Zod work in React Native too.</strong> You use a
        <code>&lt;Controller&gt;</code> to connect <code>TextInput</code> (which doesn't use refs the same way),
        and the same Zod schema validates the form. Even better: you can <strong>share the exact Zod schema</strong>
        between your web app, your Next.js Server Actions, and your mobile app — one source of validation truth
        across all three. This cross-platform code sharing (types, schemas, validation, API clients) is a defining
        advantage of an all-TypeScript React stack, and it pays off enormously in a web+mobile product.</p>`,
      })}

      ${h.exercise({
        title: "Build a mobile create form",
        prompt: `<p>Build a "New Project" form (in the modal from Lesson 6) with <code>TextInput</code> fields using
        appropriate <code>keyboardType</code>s, wrapped in <code>KeyboardAvoidingView</code> so the keyboard never
        covers the active field. Wire it with React Hook Form + a Zod schema (ideally the <em>same</em> schema your
        web app uses). Test it with the keyboard open on a device. On submit, add the project to your list.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
