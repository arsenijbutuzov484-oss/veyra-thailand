"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface ObjectInterestValue {
  selected: string;
  select: (object: string) => void;
}

const ObjectInterestContext = createContext<ObjectInterestValue | null>(null);

export function ObjectInterestProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState("");

  const select = useCallback((object: string) => {
    setSelected(object);
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo(() => ({ selected, select }), [selected, select]);

  return <ObjectInterestContext.Provider value={value}>{children}</ObjectInterestContext.Provider>;
}

export function useObjectInterest() {
  const context = useContext(ObjectInterestContext);
  if (!context) {
    throw new Error("useObjectInterest must be used inside ObjectInterestProvider");
  }
  return context;
}

export function ObjectCtaButton({
  object,
  label,
  className = "btn btn--line",
}: {
  object: string;
  label: string;
  className?: string;
}) {
  const { select } = useObjectInterest();
  return (
    <button className={className} type="button" onClick={() => select(object)}>
      {label}
    </button>
  );
}
