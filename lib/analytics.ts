export type TrackEventPayload = {
  event: string;
  productSlug: string;
  productName: string;
  ctaType: "call" | "zalo" | "quote";
  source: "video_conversion";
};

export function trackConversionEvent(payload: TrackEventPayload) {
  if (typeof window === "undefined") return;

  try {
    const w = window as Window & {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };

    if (typeof w.gtag === "function") {
      w.gtag("event", payload.event, {
        product_slug: payload.productSlug,
        product_name: payload.productName,
        cta_type: payload.ctaType,
        source: payload.source
      });
    }

    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({
        event: payload.event,
        product_slug: payload.productSlug,
        product_name: payload.productName,
        cta_type: payload.ctaType,
        source: payload.source
      });
    }
  } catch {
    // silent
  }
}
