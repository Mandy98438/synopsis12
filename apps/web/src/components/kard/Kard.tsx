"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Edit3 } from "lucide-react";
import { KardLogo } from "./kard-logo";
import {
  DEFAULT_IMAGE_TRANSFORM,
  extractDominantColors,
  type ImageTransform,
  type KardMode,
} from "./kardModes";

export interface KardSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  custom?: string;
}

export interface KardProps {
  mode: KardMode;
  imageUrl?: string;
  imageTransform?: ImageTransform;
  name: string;
  title: string;
  company?: string;
  socialLinks?: KardSocialLinks;
  barcodeId: string;
  initials?: string;
  showEdit?: boolean;
  onEdit?: () => void;
  editHref?: string;
  className?: string;
}

const BARCODE_BARS = [0,4,7,12,15,19,22,27,30,34,37,42,46,49,53,58,61,65,68,73,76,80,83,88,92,95,99,104,107,111,114,119,122,126,129,134,138];

function Barcode() {
  return (
    <svg width="140" height="36" viewBox="0 0 140 36" aria-hidden="true">
      {BARCODE_BARS.map((x, i) => (
        <rect key={i} x={x} y={0} width={i % 3 === 2 ? 3 : i % 2 === 0 ? 2 : 1} height={36} />
      ))}
    </svg>
  );
}

function SocialIcon({ type, url }: { type: keyof KardSocialLinks; url?: string }) {
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={type}>
      {type === "linkedin" && (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}
      {type === "twitter" && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
      {type === "github" && (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )}
      {(type === "instagram" || type === "custom") && (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.43" />
          <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.33-1.33" />
        </svg>
      )}
    </a>
  );
}

export function Kard({
  mode,
  imageUrl,
  imageTransform = DEFAULT_IMAGE_TRANSFORM,
  name,
  title,
  company,
  socialLinks,
  barcodeId,
  initials,
  showEdit = false,
  onEdit,
  editHref = "/dashboard",
  className,
}: KardProps) {
  const [imgError, setImgError] = useState(false);
  const [glassVars, setGlassVars] = useState({
    "--glass-color-1": "#334155",
    "--glass-color-2": "#f97316",
    "--glass-color-3": "#111827",
    "--glass-text": "#ffffff",
  } as React.CSSProperties);
  const extractedFor = useRef<string | null>(null);
  const hasSocials = socialLinks && Object.values(socialLinks).some(Boolean);

  const photoStyle = useMemo(
    () => ({
      transform: `translate(${imageTransform.x}px, ${imageTransform.y}px) scale(${imageTransform.scale})`,
    }),
    [imageTransform.x, imageTransform.y, imageTransform.scale]
  );

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    if (mode !== "glass" || !imageUrl || extractedFor.current === imageUrl) return;
    try {
      const { colors, text } = extractDominantColors(event.currentTarget);
      extractedFor.current = imageUrl;
      setGlassVars({
        "--glass-color-1": colors[0] ?? "#334155",
        "--glass-color-2": colors[1] ?? "#f97316",
        "--glass-color-3": colors[2] ?? "#111827",
        "--glass-text": text,
      } as React.CSSProperties);
    } catch {
      extractedFor.current = imageUrl;
    }
  }, [imageUrl, mode]);

  const editControl = showEdit ? (
    onEdit ? (
      <button onClick={onEdit} className="kard-edit" aria-label="Edit card appearance" type="button">
        <Edit3 size={15} />
      </button>
    ) : (
      <Link href={editHref} className="kard-edit" aria-label="Edit card">
        <Edit3 size={15} />
      </Link>
    )
  ) : null;

  return (
    <div className={`kard kard-${mode} ${className || ""}`} style={glassVars}>
      <div className="kard-header">
        <div className="kard-logo">
          <KardLogo size="sm" isDark={mode === "dark" || (mode === "glass" && glassVars["--glass-text"] === "#ffffff")} muted showWordmark={false} />
          <span>KARD</span>
        </div>
        <span className="kard-company">{company}</span>
        {editControl}
      </div>

      <div className="kard-photo-wrap">
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={`${name}'s photo`}
            className="kard-photo"
            style={photoStyle}
            crossOrigin="anonymous"
            onLoad={handleLoad}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="kard-photo-placeholder">
            <span>{initials || name.split(" ").map((part) => part[0]).join("").slice(0, 2) || "?"}</span>
          </div>
        )}
      </div>

      <div className="kard-name">{name}</div>
      <div className="kard-role">{title}</div>

      {hasSocials && (
        <div className="kard-socials">
          <SocialIcon type="linkedin" url={socialLinks?.linkedin} />
          <SocialIcon type="twitter" url={socialLinks?.twitter} />
          <SocialIcon type="github" url={socialLinks?.github} />
          <SocialIcon type="instagram" url={socialLinks?.instagram} />
          <SocialIcon type="custom" url={socialLinks?.custom} />
        </div>
      )}

      <div className="kard-footer">
        <div className="barcode-wrap">
          <Barcode />
          <span className="barcode-num">0 35545 82358 78 1</span>
        </div>
        <span className="kard-id">ID : kard.io/{barcodeId}</span>
      </div>

      <style jsx>{`
        .kard {
          width: 320px;
          border-radius: 24px;
          padding: 20px 20px 24px;
          position: relative;
          overflow: hidden;
          font-family: var(--font-sans, system-ui, sans-serif);
          animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .kard-dark {
          background: #111111;
          color: #ffffff;
          border: 1px solid #2a2a2a;
        }
        .kard-light {
          background:
            radial-gradient(circle at 22% 18%, rgba(255,255,255,0.7) 0 1px, transparent 1px),
            radial-gradient(circle at 76% 62%, rgba(170,122,74,0.13) 0 1px, transparent 1px),
            linear-gradient(135deg, #fff8ec, #f1e1c7);
          background-size: 14px 14px, 18px 18px, auto;
          color: #15120d;
          border: 1.5px solid #ddc9a8;
        }
        .kard-glass {
          color: var(--glass-text);
          border: 1px solid rgba(255, 255, 255, 0.38);
          background:
            linear-gradient(145deg, color-mix(in srgb, var(--glass-color-1) 58%, transparent), color-mix(in srgb, var(--glass-color-2) 42%, transparent)),
            linear-gradient(315deg, color-mix(in srgb, var(--glass-color-3) 30%, transparent), rgba(255,255,255,0.22));
          backdrop-filter: blur(22px) saturate(145%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.24), 0 24px 60px rgba(15,23,42,0.2);
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .kard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }
        .kard-logo {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
        }
        .kard-company {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: currentColor;
          opacity: 0.65;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          max-width: 145px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .kard-edit {
          color: currentColor;
          background: color-mix(in srgb, currentColor 10%, transparent);
          border-radius: 8px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .kard-edit:hover { color: #f97316; }
        .kard-photo-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(30,30,30,0.55);
          margin-bottom: 18px;
          border: 2px solid #f97316;
        }
        .kard-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transform-origin: center center;
          will-change: transform;
        }
        .kard-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 64px;
          font-weight: 700;
          color: color-mix(in srgb, currentColor 28%, transparent);
          letter-spacing: 0;
        }
        .kard-name {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 4px;
          letter-spacing: 0;
          line-height: 1.1;
        }
        .kard-role {
          font-size: 14px;
          color: currentColor;
          opacity: 0.64;
          margin: 0 0 16px;
          font-weight: 400;
        }
        .kard-socials {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 22px;
        }
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid color-mix(in srgb, currentColor 22%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: currentColor;
          opacity: 0.78;
          transition: border-color 0.2s, color 0.2s, background 0.2s, opacity 0.2s;
          text-decoration: none;
        }
        .social-icon:hover {
          border-color: #f97316;
          color: #f97316;
          opacity: 1;
          background: color-mix(in srgb, #f97316 10%, transparent);
        }
        .kard-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 10px;
        }
        .barcode-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .barcode-wrap :global(rect) { fill: currentColor; opacity: 0.5; }
        .kard-light .barcode-wrap :global(rect),
        .kard-light .barcode-num,
        .kard-light .kard-id { color: #171717; opacity: 0.74; }
        .barcode-num {
          font-size: 9px;
          color: currentColor;
          opacity: 0.42;
          letter-spacing: 0.04em;
        }
        .kard-id {
          font-size: 11px;
          color: currentColor;
          opacity: 0.48;
          font-family: monospace;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

export default Kard;
