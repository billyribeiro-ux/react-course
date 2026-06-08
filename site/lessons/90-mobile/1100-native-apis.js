/* Lesson 90-mobile/1100 — Native APIs: camera, notifications, location. */
registerLesson({
  meta: {
    id: "90-mobile/1100-native-apis",
    title: "Native APIs: Camera, Notifications & Location",
    part: "90-mobile",
    estMinutes: 16,
    level: "advanced",
    project: "expo-mobile",
    lede: "The whole point of a native app is access to device capabilities the web can't fully reach: the camera, push notifications, GPS, contacts, biometrics. Expo modules make these one install and a clean JS API away.",
    objectives: [
      "Access the camera and media library",
      "Send and receive push notifications",
      "Get the device's location",
      "Handle permissions correctly",
    ],
  },

  render: (h) => `
    <section class="prose">
      <h2>Permissions first</h2>
      <p>
        Every sensitive capability (camera, location, notifications, contacts) requires the user's
        <strong>permission</strong>. You request it at the moment it's needed, with context, and handle the case
        where it's denied. This isn't optional — the OS enforces it, and mishandling it breaks features silently.
      </p>

      ${h.codePane({
        lang: "tsx",
        title: "The permission pattern",
        readOnly: true,
        code: `import * as Location from "expo-location";

async function getLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // Explain why, and offer to open Settings — don't just fail silently:
    return null;
  }
  const pos = await Location.getCurrentPositionAsync();
  return pos.coords; // { latitude, longitude }
}`,
      })}

      ${h.callout({
        kind: "principal",
        title: "Request permissions with context, at the right time",
        body: `<p>Don't blast every permission request at launch — users reflexively deny those. Request a permission
        <strong>when the user takes an action that needs it</strong> ("Add a photo" → then ask for camera), with a
        brief explanation of why. If denied, degrade gracefully and offer a path to Settings. Respecting the user's
        privacy and attention here isn't just polite — over-asking gets your app rejected from the stores and
        erodes trust. Thoughtful permission UX is a mark of a professionally-built app.</p>`,
      })}

      <h2>Camera & media</h2>
      ${h.codePane({
        lang: "tsx",
        title: "Pick or capture an image",
        readOnly: true,
        code: `import * as ImagePicker from "expo-image-picker";

const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
// or launchImageLibraryAsync() to pick from the gallery
if (!result.canceled) {
  const uri = result.assets[0].uri; // upload it (Part 80's upload pattern)
}`,
      })}

      <h2>Push notifications</h2>
      ${h.callout({
        kind: "principal",
        title: "Notifications are powerful — and easily abused",
        body: `<p>Push notifications (via <code>expo-notifications</code> + Expo's push service) are a superpower for
        re-engagement, but the fastest way to get an app deleted is spammy, irrelevant notifications. The setup:
        request permission, get the device's push token, send it to your server, and your server triggers pushes
        through Expo/APNs/FCM. Use them for things the user genuinely wants (a message arrived, an order shipped) —
        and always let users control them. Respecting attention is both ethical and good for retention.</p>`,
      })}

      <h2>Location, biometrics, and more</h2>
      ${h.callout({
        kind: "note",
        body: `<p>Expo has modules for most device capabilities: <code>expo-location</code> (GPS),
        <code>expo-local-authentication</code> (Face ID / fingerprint), <code>expo-contacts</code>,
        <code>expo-haptics</code> (vibration feedback), <code>expo-sensors</code> (accelerometer), and many more.
        Each follows the same shape: install with <code>expo install</code>, request permission, call a clean async
        API. This consistency makes adding native features approachable. Browse the Expo SDK docs to see what's
        available — it's a lot.</p>`,
      })}

      ${h.exercise({
        title: "Add a native capability",
        prompt: `<p>Add at least one native feature to LaunchPad Mobile: e.g. an avatar picker using
        <code>expo-image-picker</code> (camera or library) that uploads via your Part 80 upload flow, OR
        biometric unlock with <code>expo-local-authentication</code>, OR a location feature. Implement the full
        permission flow: request with context, handle denial gracefully, and degrade if unavailable. Test granting
        and denying the permission.</p>`,
        runHint: "cd projects/expo-mobile && npx expo start",
      })}
    </section>
  `,
});
