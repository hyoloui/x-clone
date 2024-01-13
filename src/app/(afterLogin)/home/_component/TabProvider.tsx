"use client";

import { ReactNode, createContext, useContext } from "react";

export const TabContext = createContext({
  tab: "rec",
  setTab: (tab: "rec" | "fol") => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
  const { tab, setTab } = useContext(TabContext);

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
