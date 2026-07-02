"use client";

export type KardMode = "dark" | "light" | "glass";

export interface ImageTransform {
  x: number;
  y: number;
  scale: number;
}

export interface ExtractedGlassColors {
  colors: string[];
  text: "#111111" | "#ffffff";
}

export const DEFAULT_IMAGE_TRANSFORM: ImageTransform = { x: 0, y: 0, scale: 1 };

export const KARD_MODES: Record<KardMode, { label: string; swatch: string }> = {
  dark: { label: "Dark", swatch: "#111111" },
  light: { label: "Light", swatch: "#faf1df" },
  glass: { label: "Glass", swatch: "linear-gradient(135deg, #d8ecff, #f6b26b)" },
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;

const luminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs! + 0.7152 * gs! + 0.0722 * bs!;
};

export function getReadableTextColor(hex: string): "#111111" | "#ffffff" {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return luminance(r, g, b) > 0.52 ? "#111111" : "#ffffff";
}

export function extractDominantColors(image: HTMLImageElement): ExtractedGlassColors {
  const canvas = document.createElement("canvas");
  const size = 50;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  if (!ctx) {
    return { colors: ["#334155", "#f97316", "#111827"], text: "#ffffff" };
  }

  ctx.drawImage(image, 0, 0, size, size);
  const pixels = ctx.getImageData(0, 0, size, size).data;
  const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

  for (let i = 0; i < pixels.length; i += 16) {
    const alpha = pixels[i + 3] ?? 255;
    if (alpha < 180) continue;

    const r = pixels[i] ?? 0;
    const g = pixels[i + 1] ?? 0;
    const b = pixels[i + 2] ?? 0;
    if (r > 245 && g > 245 && b > 245) continue;
    if (r < 8 && g < 8 && b < 8) continue;

    const key = `${Math.round(r / 32) * 32}-${Math.round(g / 32) * 32}-${Math.round(b / 32) * 32}`;
    const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
    bucket.count += 1;
    bucket.r += r;
    bucket.g += g;
    bucket.b += b;
    buckets.set(key, bucket);
  }

  const colors = Array.from(buckets.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map((bucket) =>
      rgbToHex(
        Math.round(bucket.r / bucket.count),
        Math.round(bucket.g / bucket.count),
        Math.round(bucket.b / bucket.count)
      )
    );

  const finalColors = colors.length ? colors : ["#334155", "#f97316", "#111827"];
  return { colors: finalColors, text: getReadableTextColor(finalColors[0]!) };
}
