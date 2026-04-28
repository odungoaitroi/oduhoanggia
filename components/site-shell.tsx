import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { StickyMobileBar } from "./sticky-mobile";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <StickyMobileBar />
    </>
  );
}
