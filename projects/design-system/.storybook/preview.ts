import type { Preview } from "@storybook/react-vite";
// Load the design tokens + Tailwind so stories render with real styles.
import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
