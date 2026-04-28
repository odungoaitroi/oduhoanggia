"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteData } from "../lib/site-data";
import { getZaloWebUrl } from "../lib/zalo";
import { trackEvent } from "./analytics";

export function QuotePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "odudp-popup-dismissed";
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(key)) return;

    const timer = window.setTimeout(() => setOpen(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open) return null;

  function closePopup() {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("odudp-popup-dismissed", "1");
    }
  }

  return (
    <div className="popup-backdrop" role="dialog" aria-modal="true">
      <div className="popup-card">
        <button className="popup-close" onClick={closePopup} aria-label="Đóng popup">×</button>
        <p className="eyebrow">Tư vấn nhanh</p>
        <h3>Gửi ảnh vị trí để nhận phương án phù hợp</h3>
        <p>Phù hợp khách lẻ, quán cafe, nhà hàng và khách dự án cần báo giá nhanh trên toàn quốc.</p>
        <div className="popup-actions">
          <Link href="/bao-gia" className="button button-primary" onClick={() => trackEvent("quote_cta_click")}>Nhận báo giá</Link>
          <a href={getZaloWebUrl(siteData.phone)} target="_blank" rel="noreferrer" className="button button-secondary" onClick={() => trackEvent("zalo_click")}>Nhắn Zalo</a>
        </div>
      </div>
    </div>
  );
}
