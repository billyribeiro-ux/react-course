import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the session so we control "who is asking". This replaces session.ts
// entirely, so its server-only / next-headers imports never load.
vi.mock("@/lib/session", () => ({ requireUser: vi.fn() }));

import { requireUser } from "@/lib/session";
import { getMyProjects, createProject, deleteProject } from "./projects";

function signedInAs(id: string) {
  vi.mocked(requireUser).mockResolvedValue({ id, name: id, email: `${id}@x` });
}

beforeEach(() => vi.clearAllMocks());

// The most important tests in the app: authorization can't be bypassed.
describe("projects DAL — authorization", () => {
  it("scopes getMyProjects to the current user (no data leak)", async () => {
    signedInAs("ada");
    const mine = await getMyProjects();
    expect(mine.length).toBeGreaterThan(0);
    expect(mine.every((p) => p.ownerId === "ada")).toBe(true);
    // Crucially: never returns another user's project.
    expect(mine.some((p) => p.ownerId === "grace")).toBe(false);
  });

  it("denies deleting another user's project", async () => {
    signedInAs("ada");
    // p3 belongs to grace — ada must not be able to delete it.
    await expect(deleteProject("p3")).rejects.toThrow(/not found or not allowed/i);
  });

  it("creates a project owned by the current user", async () => {
    signedInAs("ada");
    const created = await createProject({ name: "Test", budget: 100 });
    expect(created.ownerId).toBe("ada");
    expect(created.name).toBe("Test");
  });
});
