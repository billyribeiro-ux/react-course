import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge.tsx";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "New" },
  argTypes: {
    tone: { control: "select", options: ["neutral", "brand", "danger"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { tone: "neutral" } };
export const Brand: Story = { args: { tone: "brand" } };
export const Danger: Story = { args: { tone: "danger", children: "Failed" } };
