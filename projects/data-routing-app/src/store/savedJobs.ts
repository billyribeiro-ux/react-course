import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedJobsState {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
}

// Global client state for "saved jobs" — Zustand with localStorage persistence
// (Part 70/1000). Components select the slice they need to limit re-renders.
export const useSavedJobs = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "jobboard.saved" }
  )
);
