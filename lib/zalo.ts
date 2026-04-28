export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

function buildTextQuery(text?: string) {
  const cleanText = text?.trim();
  return cleanText ? `?text=${encodeURIComponent(cleanText)}` : "";
}

export function getZaloAppUrl(phone: string, text?: string) {
  const normalizedPhone = normalizePhone(phone);
  const cleanText = text?.trim();
  return `zalo://conversation?phone=${normalizedPhone}${cleanText ? `&text=${encodeURIComponent(cleanText)}` : ""}`;
}

export function getZaloWebUrl(phone: string, text?: string) {
  const normalizedPhone = normalizePhone(phone);
  return `https://zalo.me/${normalizedPhone}${buildTextQuery(text)}`;
}

export function getZaloUrl(phone: string, text?: string) {
  return isMobileDevice() ? getZaloAppUrl(phone, text) : getZaloWebUrl(phone, text);
}

export async function copyTextToClipboard(text?: string) {
  const cleanText = text?.trim();
  if (!cleanText || typeof navigator === "undefined" || !navigator.clipboard?.writeText) return false;

  try {
    await navigator.clipboard.writeText(cleanText);
    return true;
  } catch {
    return false;
  }
}

export function openZaloWithFallback(phone: string, text?: string) {
  if (typeof window === "undefined") return false;

  const appUrl = getZaloAppUrl(phone, text);
  const webUrl = getZaloWebUrl(phone, text);

  if (!isMobileDevice()) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return true;
  }

  window.location.href = appUrl;

  window.setTimeout(() => {
    if (!document.hidden) {
      window.open(webUrl, "_blank", "noopener,noreferrer");
    }
  }, 900);

  return true;
}
