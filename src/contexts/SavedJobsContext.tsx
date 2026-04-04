import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface SavedJobsContextType {
  savedJobs: Set<string>;
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  savedCount: number;
}

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

export const SavedJobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("savedJobs");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  const toggleSave = useCallback((id: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("savedJobs", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedJobs.has(id), [savedJobs]);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, toggleSave, isSaved, savedCount: savedJobs.size }}>
      {children}
    </SavedJobsContext.Provider>
  );
};

export const useSavedJobs = () => {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error("useSavedJobs must be used within SavedJobsProvider");
  return ctx;
};
