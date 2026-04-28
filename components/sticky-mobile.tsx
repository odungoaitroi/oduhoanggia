"use client";

import { useEffect, useMemo, useState } from "react";
import { siteData } from "../lib/site-data";
import { getZaloWebUrl, normalizePhone, openZaloWithFallback } from "../lib/zalo";
import { trackEvent } from "./analytics";

function getPhoneHref(phone: string) {
  return `tel:${normalizePhone(phone)}`;
}

export function StickyMobileBar() {
  const [isNearLeadForm, setIsNearLeadForm] = useState(false);

  const phoneHref = useMemo(() => getPhoneHref(siteData.phone), []);
  const zaloHref = useMemo(() => getZaloWebUrl(siteData.phone), []);

  useEffect(() => {
    const form = document.getElementById("lead-form");
    if (!form) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearLeadForm(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -18% 0px"
      }
    );

    observer.observe(form);

    return () => {
      observer.disconnect();
    };
  }, []);

  function handleQuoteClick() {
    const form = document.getElementById("lead-form");

    trackEvent("quote_cta_click", { source: "mobile_sticky_cta" });

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

  function handleCallClick() {
    trackEvent("call_click", { source: "mobile_sticky_cta" });
  }

  function handleZaloClick() {
    trackEvent("zalo_click", { source: "mobile_sticky_cta" });
    openZaloWithFallback(siteData.phone);
  }

  if (isNearLeadForm) {
    return null;
  }

  return (
    <div className="sticky-mobile-bar" aria-label="Thanh hành động nhanh trên điện thoại">
      <a href={phoneHref} className="sticky-mobile-bar__item sticky-mobile-bar__item--call" onClick={handleCallClick}>
        Gọi ngay
      </a>
      <button type="button" className="sticky-mobile-bar__item sticky-mobile-bar__item--zalo" onClick={handleZaloClick} data-fallback-href={zaloHref}>
        Zalo
      </button>
      <button type="button" className="sticky-mobile-bar__item sticky-mobile-bar__item--quote" onClick={handleQuoteClick}>
        Báo giá
      </button>
    </div>
  );
}
