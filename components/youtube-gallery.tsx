"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { trackEvent } from "./analytics";
import { Container, SectionTitle } from "./ui";
import {
  getYoutubeEmbedUrl,
  getYoutubeId,
  getYoutubeThumbnail
} from "../lib/youtube";
import { siteData } from "../lib/site-data";
import { getZaloWebUrl } from "../lib/zalo";

type YoutubeVideo = {
  id?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId?: string;
  productSlug?: string;
  projectSlug?: string;
};

type YoutubeGalleryProps = {
  videos: readonly YoutubeVideo[];
  title: string;
  subtitle?: string;
  productSlug?: string;
  projectSlug?: string;
  limit?: number;
  source?: string;
  showCtas?: boolean;
};

export function YoutubeGallery({
  videos,
  title,
  subtitle,
  productSlug,
  projectSlug,
  limit,
  source = "youtube_gallery",
  showCtas = true
}: YoutubeGalleryProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const visibleVideos = useMemo(() => {
    const filteredVideos = videos.filter((video) => {
      if (productSlug && video.productSlug !== productSlug) return false;
      if (projectSlug && video.projectSlug !== projectSlug) return false;

      return Boolean(getYoutubeId(video.youtubeUrl, video.youtubeId));
    });

    return typeof limit === "number" ? filteredVideos.slice(0, limit) : filteredVideos;
  }, [limit, productSlug, projectSlug, videos]);

  function handlePlay(videoTitle: string, youtubeId: string) {
    setActiveVideoId(youtubeId);
    trackEvent("play_video", {
      source,
      video_id: youtubeId,
      video_title: videoTitle
    });
  }

  function handleQuoteClick(videoTitle: string, youtubeId: string) {
    trackEvent("quote_cta_click", {
      source,
      placement: "video_card",
      video_id: youtubeId,
      video_title: videoTitle
    });

    const form = document.getElementById("lead-form");

    if (!form) {
      window.location.href = "/bao-gia";
      return;
    }

    const y = form.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth"
    });

    window.setTimeout(() => {
      const phoneField = form.querySelector<HTMLInputElement>("input[inputmode='tel']");
      phoneField?.focus();
    }, 350);
  }

  if (visibleVideos.length === 0) return null;

  return (
    <section className="section youtube-funnel-section" aria-labelledby="youtube-gallery-title">
      <Container>
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="video-grid youtube-funnel-grid">
          {visibleVideos.map((video) => {
            const youtubeId = getYoutubeId(video.youtubeUrl, video.youtubeId);
            if (!youtubeId) return null;

            const isActive = activeVideoId === youtubeId;
            const thumbnailUrl = getYoutubeThumbnail(video.youtubeUrl, video.youtubeId);
            const embedUrl = getYoutubeEmbedUrl(video.youtubeUrl, video.youtubeId, true);

            return (
              <article key={youtubeId} className="video-card youtube-funnel-card">
                <div className="video-wrapper youtube-funnel-player">
                  {isActive ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      className="youtube-thumb video-thumb"
                      onClick={() => handlePlay(video.title, youtubeId)}
                      aria-label={`Xem video sửa chữa ngay trên website: ${video.title}`}
                    >
                      <Image
                        src={thumbnailUrl}
                        alt={`Thumbnail video ${video.title}`}
                        title={video.title}
                        width={480}
                        height={360}
                        className="youtube-thumb-image video-thumb-image"
                        loading="lazy"
                      />

                      <span className="youtube-funnel-overlay" aria-hidden="true" />

                      <span className="youtube-play" aria-hidden="true">
                        <span className="youtube-play-icon">▶</span>
                        Xem ngay
                      </span>
                    </button>
                  )}
                </div>

                <div className="youtube-card-body youtube-funnel-body">
                  <span>Video kỹ thuật sau bán hàng</span>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>

                  {showCtas ? (
                    <div
                      className="video-card-actions"
                      aria-label={`Hành động sau khi xem video ${video.title}`}
                    >
                      <a
                        href={`tel:${siteData.phone}`}
                        onClick={() =>
                          trackEvent("call_click", {
                            source,
                            placement: "video_card",
                            video_id: youtubeId
                          })
                        }
                      >
                        Cần tư vấn sửa dù?
                      </a>

                      <a
                        href={getZaloWebUrl(siteData.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackEvent("zalo_click", {
                            source,
                            placement: "video_card",
                            video_id: youtubeId
                          })
                        }
                      >
                        Liên hệ kỹ thuật qua Zalo
                      </a>

                      <button
                        type="button"
                        onClick={() => handleQuoteClick(video.title, youtubeId)}
                      >
                        Xem tư vấn kỹ thuật
                      </button>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
