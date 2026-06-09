import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field.tsx";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  args: { label: "Email", placeholder: "you@example.com" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: "We'll never share it." } };
export const WithError: Story = { args: { error: "Email is required" } };
