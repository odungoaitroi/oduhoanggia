"use client";

import type { ReactNode } from "react";
import { trackEvent } from "./analytics";

type QuoteCtaProps = {
  children: ReactNode;
  className?: string;
  source?: string;
};

export function QuoteCta({ children, className = "button button-primary", source = "homepage" }: QuoteCtaProps) {
  function handleClick() {
    trackEvent("quote_cta_click", { source });

    const form = document.getElementById("lead-form");
    if (!form) {
      window.location.href = "/bao-gia";
      return;
    }

    const y = form.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });

    window.setTimeout(() => {
      const phoneField = form.querySelector<HTMLInputElement>("input[inputmode='tel']");
      phoneField?.focus();
    }, 350);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
