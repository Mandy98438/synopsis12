"use client";

// ─────────────────────────────────────────────
// KARD — Premium Card Component
// Implements the new high-fidelity dark-themed
// card design with dynamic properties.
// ─────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { Spotlight } from "@/components/core/spotlight";
import { ProgressiveBlur } from "@/components/core/progressive-blur";

export interface KardCardProps {
  name: string;
  role: string;
  company: string;
  photoUrl?: string;
  kardId: string; // e.g. "maya" → kard.io/maya
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  showEdit?: boolean;
  onEdit?: () => void;
}

export function KardCard({
  name,
  role,
  company,
  photoUrl,
  kardId,
  socials,
  showEdit = false,
  onEdit,
}: KardCardProps) {
  const hasSocials = socials && Object.values(socials).some(Boolean);

  return (
    <div className="kard">
      <Spotlight
        className="from-orange-500/15 via-orange-600/5 to-transparent blur-2xl"
        size={140}
      />
      {/* Header */}
      <div className="kard-header">
        <div className="kard-logo">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 18,17 2,17" fill="#F97316" />
          </svg>
          <span>KARD</span>
        </div>

        <span className="kard-company">{company}</span>

        {showEdit && (
          onEdit ? (
            <button 
              onClick={onEdit}
              className="kard-edit" 
              aria-label="Edit card"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          ) : (
            <Link 
              href="/dashboard"
              className="kard-edit" 
              aria-label="Edit card"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </Link>
          )
        )}
      </div>

      {/* Photo */}
      <div className="kard-photo-wrap">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`${name}'s photo`}
            fill
            className="kard-photo"
            sizes="280px"
            priority
          />
        ) : (
          <div className="kard-photo-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        )}
        <ProgressiveBlur
          className="pointer-events-none absolute bottom-0 left-0 h-[40%] w-full"
          blurIntensity={4}
        />
        <div className="orange-corner" />
      </div>

      {/* Identity */}
      <div className="kard-name">{name}</div>
      <div className="kard-role">{role}</div>

      {/* Socials */}
      {hasSocials && (
        <div className="kard-socials">
          {socials.linkedin && (
            <a 
              href={socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              aria-label="LinkedIn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          )}
          {socials.twitter && (
            <a 
              href={socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              aria-label="X / Twitter"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {socials.github && (
            <a 
              href={socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon" 
              aria-label="GitHub"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="kard-footer">
        <div className="barcode-wrap">
          <svg width="140" height="36" viewBox="0 0 140 36" aria-hidden="true">
            {[0,4,7,12,15,19,22,27,30,34,37,42,46,49,53,58,61,65,68,73,76,80,83,88,92,95,99,104,107,111,114,119,122,126,129,134,138].map((x, i) => (
              <rect key={i} x={x} y={0} width={i % 3 === 2 ? 3 : i % 2 === 0 ? 2 : 1} height={36} fill="#555" />
            ))}
          </svg>
          <span className="barcode-num">0 35545 82358 78 1</span>
        </div>
        <span className="kard-id">ID : kard.io/{kardId}</span>
      </div>
    </div>
  );
}

export default KardCard;
