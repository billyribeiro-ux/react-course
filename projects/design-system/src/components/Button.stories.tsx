import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button.tsx";

// A Storybook "story file" documents a component: its variants, props (as
// interactive controls), and usage. Designers and engineers browse these.
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Click me" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Danger: Story = { args: { variant: "danger" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Large: Story = { args: { size: "lg" } };
export const Disabled: Story = { args: { disabled: true } };
