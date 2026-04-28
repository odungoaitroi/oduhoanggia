"use client";

import { type ChangeEvent, type FormEvent, useMemo, useRef, useState } from "react";
import { trackEvent } from "./analytics";
import { siteData } from "../lib/site-data";
import { copyTextToClipboard, getZaloWebUrl, openZaloWithFallback } from "../lib/zalo";

type QuoteFormState = {
  name: string;
  phone: string;
  area: string;
  umbrellaType: string;
  quantity: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "ready" | "error";

type CopyState = "idle" | "copied" | "manual";

type LeadApiResponse = {
  ok?: boolean;
  message?: string;
  delivery?: string;
};

const initialState: QuoteFormState = {
  name: "",
  phone: "",
  area: "",
  umbrellaType: "",
  quantity: "",
  message: ""
};

const phoneRegex = /^0(?:3|5|7|8|9)\d{8}$/;
const leadRequestTimeoutMs = 6000;

const umbrellaTypeOptions = [
  "Dù che nắng quán cafe",
  "Dù lệch tâm",
  "Dù sân vườn",
  "Dù tròn tâm giữa",
  "Dù sự kiện / quảng cáo",
  "Dù in logo",
  "Chưa rõ, cần tư vấn"
];

function normalizeVietnamPhone(phone: string) {
  return phone.replace(/[\s.\-()]/g, "").trim();
}

function getCurrentPageUrl() {
  if (typeof window === "undefined") return siteData.domain;
  return window.location.href;
}

function buildQuoteMessage(form: QuoteFormState) {
  const normalizedPhone = normalizeVietnamPhone(form.phone);

  return [
    "Xin chào Ô Dù Đại Phát, tôi cần nhận báo giá:",
    `- Họ tên: ${form.name.trim() || "Chưa cung cấp"}`,
    `- Số điện thoại: ${normalizedPhone}`,
    `- Khu vực: ${form.area.trim() || "Chưa cung cấp"}`,
    `- Loại dù: ${form.umbrellaType.trim() || "Chưa rõ, cần tư vấn"}`,
    `- Số lượng: ${form.quantity.trim() || "Chưa cung cấp"}`,
    `- Nhu cầu: ${form.message.trim() || "Cần tư vấn mẫu phù hợp và báo giá."}`,
    `- Trang gửi: ${getCurrentPageUrl()}`
  ].join("\n");
}

function buildLeadMessage(form: QuoteFormState, quoteText: string) {
  return [
    form.message.trim() || "Khách cần tư vấn mẫu phù hợp và báo giá.",
    form.umbrellaType.trim() ? `Loại dù: ${form.umbrellaType.trim()}` : "",
    form.quantity.trim() ? `Số lượng: ${form.quantity.trim()}` : "",
    `Nội dung Zalo đã tạo:\n${quoteText}`
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n\n");
}

async function readLeadApiResponse(response: Response): Promise<LeadApiResponse | null> {
  try {
    return (await response.json()) as LeadApiResponse;
  } catch {
    return null;
  }
}

async function sendLeadInBackground(form: QuoteFormState, normalizedPhone: string, quoteText: string, source: string) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), leadRequestTimeoutMs);

  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.trim() || "Khách website",
        phone: normalizedPhone,
        area: form.area.trim(),
        message: buildLeadMessage(form, quoteText),
        source
      }),
      signal: controller.signal
    });

    const data = await readLeadApiResponse(response);
    trackEvent("quote_api_result", {
      source,
      ok: response.ok && data?.ok !== false ? "yes" : "no",
      status: response.status,
      delivery: data?.delivery || "unknown"
    });
  } catch (error) {
    trackEvent("quote_api_result", {
      source,
      ok: "no",
      reason: error instanceof DOMException && error.name === "AbortError" ? "timeout" : "network_error"
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function LeadForm({ source = "website" }: { source?: string }) {
  const [form, setForm] = useState<QuoteFormState>(initialState);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [notice, setNotice] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const isSubmittingRef = useRef(false);

  const normalizedPhone = useMemo(() => normalizeVietnamPhone(form.phone), [form.phone]);
  const isPhoneValid = phoneRegex.test(normalizedPhone);
  const zaloFallbackUrl = useMemo(() => getZaloWebUrl(siteData.phone, quoteText), [quoteText]);

  function updateField(field: keyof QuoteFormState) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (field === "phone") setPhoneError("");
      if (status === "error") {
        setStatus("idle");
        setNotice("");
      }
    };
  }

  async function copyQuoteText(text = quoteText) {
    const copied = await copyTextToClipboard(text);
    setCopyState(copied ? "copied" : "manual");
    trackEvent("quote_copy", { source, result: copied ? "copied" : "manual" });
    return copied;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      if (!isPhoneValid) {
        setStatus("error");
        setPhoneError("Vui lòng nhập số điện thoại Việt Nam hợp lệ: 10 số và bắt đầu bằng 03, 05, 07, 08 hoặc 09.");
        setNotice("Bạn chỉ cần nhập đúng số điện thoại để tạo nội dung báo giá qua Zalo.");
        return;
      }

      setStatus("submitting");
      setNotice("Đang tạo nội dung báo giá và chuẩn bị mở Zalo...");
      setCopyState("idle");

      const text = buildQuoteMessage({ ...form, phone: normalizedPhone });
      setQuoteText(text);

      void sendLeadInBackground(form, normalizedPhone, text, source);

      const copied = await copyQuoteText(text);
      setStatus("ready");
      setNotice(copied
        ? "Nội dung báo giá đã được tạo và copy. Nếu Zalo không tự mở, hãy bấm nút bên dưới."
        : "Nội dung báo giá đã được tạo. Trình duyệt chưa cho copy tự động, bạn có thể copy thủ công bên dưới."
      );

      trackEvent("quote_submit", {
        source,
        phone_valid: "yes",
        umbrella_type: form.umbrellaType || "not_selected",
        has_name: form.name.trim() ? "yes" : "no",
        has_area: form.area.trim() ? "yes" : "no"
      });

      trackEvent("zalo_click", { source, placement: "quote_form_submit" });
      openZaloWithFallback(siteData.phone, text);
    } finally {
      isSubmittingRef.current = false;
    }
  }

  async function handleManualCopy() {
    await copyQuoteText();
  }

  function handleOpenZalo() {
    trackEvent("zalo_click", { source, placement: "quote_form_result" });
    openZaloWithFallback(siteData.phone, quoteText);
  }

  function handleCallClick() {
    trackEvent("call_click", { source, placement: "quote_form_result" });
  }

  return (
    <form id="lead-form" className="lead-form quote-form" onSubmit={handleSubmit} noValidate>
      <div className="quote-form__intro">
        <span className="quote-form__badge">Báo giá nhanh qua Zalo</span>
        <h3>Nhận báo giá ô dù ngoài trời</h3>
        <p>Điền số điện thoại và nhu cầu. Website sẽ tạo sẵn nội dung để bạn gửi qua Zalo cho Ô Dù Đại Phát.</p>
      </div>

      <div className="quote-form__grid">
        <label>
          Họ tên <span className="quote-form__optional">(không bắt buộc)</span>
          <input value={form.name} onChange={updateField("name")} placeholder="Ví dụ: Anh Nam, Chị Lan" autoComplete="name" enterKeyHint="next" />
        </label>

        <label>
          Số điện thoại <span aria-hidden="true" className="quote-form__required">*</span>
          <input
            value={form.phone}
            onChange={updateField("phone")}
            placeholder="Ví dụ: 0349596898"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="next"
            aria-invalid={phoneError ? "true" : "false"}
            aria-describedby={phoneError ? "quote-phone-error" : undefined}
            required
          />
          {phoneError ? <span id="quote-phone-error" className="quote-form__error">{phoneError}</span> : null}
        </label>
      </div>

      <div className="quote-form__grid">
        <label>
          Khu vực / tỉnh thành
          <input value={form.area} onChange={updateField("area")} placeholder="Ví dụ: TP.HCM, Bình Dương, Hà Nội" autoComplete="address-level1" enterKeyHint="next" />
        </label>

        <label>
          Loại dù cần tư vấn
          <select value={form.umbrellaType} onChange={updateField("umbrellaType")}> 
            <option value="">Chọn loại dù hoặc để trống</option>
            {umbrellaTypeOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <label>
        Số lượng / dự kiến
        <input value={form.quantity} onChange={updateField("quantity")} placeholder="Ví dụ: 1 bộ, 3 bộ, cần nhiều bộ cho quán" enterKeyHint="next" />
      </label>

      <label>
        Nội dung nhu cầu
        <textarea
          value={form.message}
          onChange={updateField("message")}
          placeholder="Ví dụ: Cần dù che nắng cho quán cafe, ưu tiên loại bền, màu đẹp, cần tư vấn kích thước phù hợp."
          rows={5}
          maxLength={1200}
        />
      </label>

      <button type="submit" className="submit-button quote-form__submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Đang xử lý..." : "Gửi yêu cầu báo giá"}
      </button>

      <p className={`form-status ${status === "error" ? "is-error" : status === "ready" ? "is-success" : ""}`} aria-live="polite">
        {notice || "Sau khi gửi, nội dung sẽ được copy để bạn dán vào Zalo nếu ứng dụng không tự điền tin nhắn."}
      </p>

      {quoteText ? (
        <div className="lead-fallback quote-result" role="group" aria-label="Kết quả nội dung báo giá">
          <div className="quote-result__message">
            Nội dung báo giá đã được tạo. Nếu Zalo không tự mở, hãy bấm nút bên dưới.
          </div>

          <label>
            Nội dung gửi qua Zalo
            <textarea value={quoteText} readOnly rows={8} onFocus={(event) => event.currentTarget.select()} />
          </label>

          <div className="quote-result__actions">
            <button type="button" className="button button-secondary" onClick={handleManualCopy}>
              {copyState === "copied" ? "Đã copy nội dung" : "Copy lại nội dung"}
            </button>
            <button type="button" className="button button-zalo" onClick={handleOpenZalo}>Mở Zalo</button>
            <a href={`tel:${siteData.phone}`} className="button button-primary" onClick={handleCallClick}>Gọi ngay {siteData.phoneDisplay}</a>
          </div>

          <a href={zaloFallbackUrl} target="_blank" rel="noreferrer" className="text-link" onClick={() => trackEvent("zalo_click", { source, placement: "quote_form_web_fallback" })}>
            Link dự phòng: mở Zalo trên trình duyệt
          </a>
        </div>
      ) : null}
    </form>
  );
}
