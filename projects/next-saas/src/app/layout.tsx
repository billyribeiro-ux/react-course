import type { Metadata } from "next";
import "./globals.css";

// Metadata is defined declaratively and rendered on the server (great SEO).
export const metadata: Metadata = {
  title: "LaunchPad — Full-Stack SaaS",
  description: "A full-stack SaaS built with Next.js 16, RSC, and Server Actions.",
};

// The root layout wraps every page. It's a Server Component by default.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
