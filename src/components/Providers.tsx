"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";
import CursorGlow from "@/components/CursorGlow";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CursorGlow />
      {children}
    </LanguageProvider>
  );
}
