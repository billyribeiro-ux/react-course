import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — merge conditional class names AND resolve Tailwind conflicts.
 * clsx builds the string from conditions; twMerge ensures the last of any
 * conflicting utilities wins (e.g. cn("p-2", "p-4") -> "p-4").
 * This tiny helper is the backbone of every component's className API.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
