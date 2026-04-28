import type { Product } from "./site-data";
import { guideVideos, type GuideVideo } from "./video-data";

const YOUTUBE_RSS_URL =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCJQQMfeG9xoCoYHqMD8e4JQ";

export type ProductYoutubeVideo = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  uploadDate?: string;
  productSlug?: string;
  projectSlug?: string;
};

type ParsedYoutubeRssVideo = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  uploadDate?: string;
};

type ScoredVideo = {
  video: ProductYoutubeVideo;
  score: number;
};

type CategoryVideoInput = {
  slug: string;
  name: string;
  intro?: string;
  benefits?: string[];
};

const CATEGORY_VIDEO_KEYWORDS: Record<string, string[]> = {
  "du-quan-cafe": [
    "du quan cafe",
    "du cafe",
    "o du quan cafe",
    "du che nang quan cafe",
    "du san vuon",
    "cafe san vuon",
    "quan cafe",
    "cafe"
  ]
};

export function getYoutubeId(youtubeUrl: string, youtubeId?: string) {
  if (youtubeId?.trim()) return youtubeId.trim();

  try {
    const url = new URL(youtubeUrl);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname.startsWith("/watch")) {
        return url.searchParams.get("v") ?? "";
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getYoutubeThumbnail(youtubeUrl: string, youtubeId?: string) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

export function getYoutubeEmbedUrl(youtubeUrl: string, youtubeId?: string, autoplay = false) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  if (!id) return "";

  return `https://www.youtube.com/embed/${id}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;
}

export function getYoutubeWatchUrl(youtubeUrl: string, youtubeId?: string) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  return id ? `https://www.youtube.com/watch?v=${id}` : youtubeUrl;
}

function decodeXmlValue(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function getXmlTagValue(xml: string, tagName: string) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(regex);
  return match?.[1] ? decodeXmlValue(match[1]) : "";
}

function getXmlAttributeValue(xml: string, tagName: string, attributeName: string) {
  const regex = new RegExp(`<${tagName}[^>]*\\s${attributeName}=["']([^"']+)["'][^>]*>`, "i");
  const match = xml.match(regex);
  return match?.[1] ? decodeXmlValue(match[1]) : "";
}

function getRssEntryBlocks(xml: string) {
  const matches = xml.match(/<entry\b[\s\S]*?<\/entry>/gi);
  return matches ?? [];
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(value: string) {
  return normalizeText(value).replace(/\s+/g, "");
}

function dedupeVideos(videos: ProductYoutubeVideo[]) {
  const seen = new Set<string>();

  return videos.filter((video) => {
    const key = video.youtubeId || video.id;
    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function getKeywordPhrases(product: Product) {
  const specsText = product.specs.map((spec) => `${spec.label} ${spec.value}`);

  const sourceValues = [
    product.slug,
    product.categorySlug,
    product.name,
    product.summary,
    ...product.highlights,
    ...product.applications,
    ...specsText
  ];

  const unique = new Set<string>();

  for (const value of sourceValues) {
    const normalized = normalizeText(value);
    if (normalized.length >= 3) unique.add(normalized);
  }

  return Array.from(unique);
}

function getImportantTokens(product: Product) {
  const text = normalizeText(
    [
      product.slug,
      product.categorySlug,
      product.name,
      product.summary,
      ...product.highlights,
      ...product.applications,
      ...product.specs.map((spec) => spec.value)
    ].join(" ")
  );

  const ignored = new Set([
    "du",
    "o",
    "ngoai",
    "troi",
    "cho",
    "theo",
    "phu",
    "hop",
    "voi",
    "cao",
    "cap",
    "san",
    "vuon",
    "quan",
    "cafe",
    "khung",
    "mau",
    "nay",
    "can",
    "khu",
    "vuc"
  ]);

  return Array.from(new Set(text.split(" ").filter((token) => token.length >= 3 && !ignored.has(token))));
}

function scoreVideoForProduct(video: ProductYoutubeVideo, product: Product) {
  const haystack = normalizeText(`${video.title} ${video.description}`);
  const compactHaystack = compactText(haystack);
  const slug = normalizeText(product.slug);
  const name = normalizeText(product.name);
  const category = normalizeText(product.categorySlug);

  let score = 0;

  if (compactHaystack.includes(compactText(slug))) score += 120;
  if (name && haystack.includes(name)) score += 90;
  if (category && haystack.includes(category)) score += 25;

  for (const phrase of getKeywordPhrases(product)) {
    if (phrase.length >= 8 && haystack.includes(phrase)) score += 12;
  }

  for (const token of getImportantTokens(product)) {
    if (haystack.includes(token)) score += 4;
  }

  return score;
}

function scoreVideoForCategory(video: ProductYoutubeVideo, category: CategoryVideoInput) {
  const haystack = normalizeText(`${video.title} ${video.description}`);
  const compactHaystack = compactText(haystack);
  const slug = normalizeText(category.slug);
  const name = normalizeText(category.name);
  const intro = normalizeText(category.intro ?? "");
  const customKeywords = CATEGORY_VIDEO_KEYWORDS[category.slug] ?? [];

  let score = 0;

  if (compactHaystack.includes(compactText(slug))) score += 200;
  if (name && haystack.includes(name)) score += 140;

  for (const keyword of customKeywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) continue;

    if (haystack.includes(normalizedKeyword)) {
      score += 120;
    }

    for (const token of normalizedKeyword.split(" ")) {
      if (token.length >= 3 && haystack.includes(token)) {
        score += 40;
      }
    }
  }

  for (const benefit of category.benefits ?? []) {
    const normalizedBenefit = normalizeText(benefit);
    if (normalizedBenefit.length >= 8 && haystack.includes(normalizedBenefit)) {
      score += 12;
    }
  }

  if (intro && haystack.includes(intro)) score += 10;

  return score;
}

function parseYoutubeRss(xml: string): ParsedYoutubeRssVideo[] {
  const videos: ParsedYoutubeRssVideo[] = [];

  for (const entry of getRssEntryBlocks(xml)) {
    const youtubeId = getXmlTagValue(entry, "yt:videoId");
    const title = getXmlTagValue(entry, "title");
    const published = getXmlTagValue(entry, "published");
    const description = getXmlTagValue(entry, "media:description") || title;
    const link = getXmlAttributeValue(entry, "link", "href");

    const youtubeUrl = getYoutubeWatchUrl(link || `https://www.youtube.com/watch?v=${youtubeId}`, youtubeId);

    if (!youtubeId || !title || !youtubeUrl) continue;

    videos.push({
      id: youtubeId,
      title,
      description,
      youtubeUrl,
      youtubeId,
      uploadDate: published || undefined
    });
  }

  return videos;
}

function mapRssVideo(video: ParsedYoutubeRssVideo): ProductYoutubeVideo {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    youtubeUrl: video.youtubeUrl,
    youtubeId: video.youtubeId,
    uploadDate: video.uploadDate
  };
}

function mapGuideVideo(video: GuideVideo): ProductYoutubeVideo {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    youtubeUrl: getYoutubeWatchUrl(video.youtubeUrl, video.youtubeId),
    youtubeId: video.youtubeId,
    uploadDate: video.uploadDate,
    productSlug: video.productSlug,
    projectSlug: video.projectSlug
  };
}

function getFallbackVideos(product: Product, limit: number) {
  const direct = guideVideos.filter((video) => video.productSlug === product.slug).map(mapGuideVideo);

  if (direct.length > 0) {
    return dedupeVideos(direct).slice(0, limit);
  }

  const scored = guideVideos
    .map(mapGuideVideo)
    .map((video): ScoredVideo => ({
      video,
      score: scoreVideoForProduct(video, product)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.video);

  if (scored.length > 0) {
    return dedupeVideos(scored).slice(0, limit);
  }

  return [];
}

function getFallbackCategoryVideos(category: CategoryVideoInput, limit: number) {
  const scored = guideVideos
    .map(mapGuideVideo)
    .map((video): ScoredVideo => ({
      video,
      score: scoreVideoForCategory(video, category)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.video);

  if (scored.length > 0) {
    return dedupeVideos(scored).slice(0, limit);
  }

  return [];
}

export async function getChannelVideos() {
  try {
    const response = await fetch(YOUTUBE_RSS_URL, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) return [];

    const xml = await response.text();

    return dedupeVideos(parseYoutubeRss(xml).map(mapRssVideo));
  } catch {
    return [];
  }
}

export async function getProductVideos(product: Product, limit = 3) {
  const rssVideos = await getChannelVideos();

  if (rssVideos.length === 0) {
    return getFallbackVideos(product, limit);
  }

  const matched = rssVideos
    .map((video): ScoredVideo => ({
      video,
      score: scoreVideoForProduct(video, product)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.video);

  if (matched.length > 0) {
    return dedupeVideos(matched).slice(0, limit);
  }

  return [];
}

export async function getCategoryVideos(category: CategoryVideoInput, limit = 3) {
  const rssVideos = await getChannelVideos();

  if (rssVideos.length > 0) {
    const matched = rssVideos
      .map((video): ScoredVideo => ({
        video,
        score: scoreVideoForCategory(video, category)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.video);

    if (matched.length > 0) {
      return dedupeVideos(matched).slice(0, limit);
    }

    return [];
  }

  return getFallbackCategoryVideos(category, limit);
}
