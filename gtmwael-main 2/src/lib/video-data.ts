import tiktokCover from "@/assets/tiktok-cover.png";
import youtubeCover from "@/assets/youtube-cover.png";
import saasCover from "@/assets/saas-video-cover.png";
import type { VideoProject } from "@/components/VideoGrid";

export const videoProjects: VideoProject[] = [
  {
    title: "TikTok Viral Account",
    platform: "TikTok",
    metric: "4M+",
    metricLabel: "Views",
    description: "Viral content strategy that captured millions of eyeballs with scroll-stopping hooks.",
    isVertical: true,
    link: "https://www.tiktok.com/@.jmayel.sekran",
    cover: tiktokCover,
  },
  {
    title: "AI Travel YouTube Channel",
    platform: "YouTube",
    metric: "60K",
    metricLabel: "Views in 3 Months",
    description: "AI-powered travel content that built an engaged audience from scratch.",
    isVertical: false,
    link: "https://www.youtube.com/@NomadBudget",
    cover: youtubeCover,
  },
  {
    title: "SaaS Video – AI Pixar Style",
    platform: "Brand Video",
    metric: "Pixar",
    metricLabel: "AI Style",
    description: "Cinematic product storytelling with cutting-edge AI animation techniques.",
    isVertical: false,
    link: "https://www.behance.net/gallery/235424213/Bring-Your-Saas-to-life",
    cover: saasCover,
  },
];
