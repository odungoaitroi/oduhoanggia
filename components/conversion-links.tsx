"use client";

import type { MouseEvent, ReactNode } from "react";
import { trackEvent } from "./analytics";
import { siteData } from "../lib/site-data";
import { getZaloWebUrl, openZaloWithFallback } from "../lib/zalo";

export function PhoneLink({ placement = "cta", className = "button button-secondary", children }: { placement?: string; className?: string; children?: ReactNode }) {
  return (
    <a href={`tel:${siteData.phone}`} className={className} onClick={() => trackEvent("call_click", { placement })}>
      {children ?? `Gọi ${siteData.phoneDisplay}`}
    </a>
  );
}

export function ZaloLink({ placement = "cta", className = "button button-primary", children }: { placement?: string; className?: string; children?: ReactNode }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    trackEvent("zalo_click", { placement });
    openZaloWithFallback(siteData.phone);
  }

  return (
    <a href={getZaloWebUrl(siteData.phone)} target="_blank" rel="noreferrer" className={className} onClick={handleClick}>
      {children ?? "Nhắn Zalo"}
    </a>
  );
}
