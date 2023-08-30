"use client";
import { ThemeProvider } from "next-themes";
// wherever we have state, declare it as a client component

import React, { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};
export default Providers;
