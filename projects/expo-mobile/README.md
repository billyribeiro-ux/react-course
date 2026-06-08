# LaunchPad Mobile (`expo-mobile`)

The Part 90 project: a React Native app built with **Expo SDK 56** and **Expo
Router**, the mobile companion to the Next.js web app.

## Standalone install

Unlike the other projects, this Expo app is **not** part of the pnpm workspace
(React Native's Metro bundler and native-module hoisting don't fit cleanly in a
workspace). Install and run it from its own folder:

```bash
cd projects/expo-mobile
npm install          # or: pnpm install --ignore-workspace
npx expo start       # opens the dev server; scan the QR with Expo Go
```

- Press `i` for the iOS simulator, `a` for Android, or `w` for web.
- Install **Expo Go** on your phone and scan the QR code to run it on a real device.

## Structure (file-based routing, like Next.js)

```
app/
├── _layout.tsx          # root Stack navigator
├── (tabs)/
│   ├── _layout.tsx      # tab navigator
│   ├── index.tsx        # Home tab
│   └── projects.tsx     # Projects tab (FlashList)
└── project/[id].tsx     # dynamic project detail route
```

You build this up across Part 90: navigation, native APIs (camera,
notifications, secure storage), animations with Reanimated, offline data, and
shipping to the App Store / Play Store with EAS.
