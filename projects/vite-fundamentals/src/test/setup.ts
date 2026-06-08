// Runs before every test file. Adds jest-dom's custom matchers to Vitest's
// expect (toBeInTheDocument, toHaveTextContent, etc.) and auto-cleans the DOM.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
