"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { KardLogo } from "./kard-logo";
import GlareHover from "@/components/core/glare-hover";

interface Person {
  name: string;
  role: string;
  company: string;
  kardId: string;
  initials: string;
  photo: string;
  linkedin?: string;
  twitter?: string;
}

const PEOPLE: Person[] = [
  {
    name: "Elon Musk",
    role: "Founder — Tesla, SpaceX, xAI",
    company: "xAI / Tesla",
    kardId: "elon",
    initials: "EM",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    linkedin: "https://www.linkedin.com/in/elon-musk-0a2b8b1",
    twitter: "https://x.com/elonmusk",
  },
  {
    name: "Satya Nadella",
    role: "Chairman & CEO — Microsoft",
    company: "Microsoft",
    kardId: "satya",
    initials: "SN",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/440px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg",
    linkedin: "https://www.linkedin.com/in/satyanadella",
    twitter: "https://x.com/satyanadella",
  },
  {
    name: "Sundar Pichai",
    role: "CEO — Google & Alphabet",
    company: "Alphabet",
    kardId: "sundar",
    initials: "SP",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sundar_Pichai_in_2023.jpg/440px-Sundar_Pichai_in_2023.jpg",
    linkedin: "https://www.linkedin.com/in/sundarpichai",
    twitter: "https://x.com/sundarpichai",
  },
  {
    name: "Tim Cook",
    role: "CEO — Apple",
    company: "Apple",
    kardId: "tim",
    initials: "TC",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Tim_Cook_2019_cropped.jpg/440px-Tim_Cook_2019_cropped.jpg",
    linkedin: "https://www.linkedin.com/in/tim-cook-3a1a4",
    twitter: "https://x.com/tim_cook",
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO — NVIDIA",
    company: "NVIDIA",
    kardId: "jensen",
    initials: "JH",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Jensen_Huang_at_GTC_2024_%28cropped%29.jpg/440px-Jensen_Huang_at_GTC_2024_%28cropped%29.jpg",
    linkedin: "https://www.linkedin.com/in/jenhsunhuang",
  },
  {
    name: "Garry Tan",
    role: "President & CEO — Y Combinator",
    company: "Y Combinator",
    kardId: "garry",
    initials: "GT",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Garry_Tan_2019_%28cropped%29.jpg/440px-Garry_Tan_2019_%28cropped%29.jpg",
    linkedin: "https://www.linkedin.com/in/garrytan",
    twitter: "https://x.com/garrytan",
  },
  {
    name: "Paul Graham",
    role: "Founder — Y Combinator",
    company: "Y Combinator",
    kardId: "pg",
    initials: "PG",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Paul_Graham_LI.jpg/440px-Paul_Graham_LI.jpg",
    linkedin: "https://www.linkedin.com/in/paulgraham",
    twitter: "https://x.com/paulg",
  },
  {
    name: "Dario Amodei",
    role: "CEO & Co-founder — Anthropic",
    company: "Anthropic",
    kardId: "dario",
    initials: "DA",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Dario_Amodei_2024_%28cropped%29.jpg/440px-Dario_Amodei_2024_%28cropped%29.jpg",
    linkedin: "https://www.linkedin.com/in/darioamodei",
    twitter: "https://x.com/DarioAmodei",
  },
  {
    name: "Daniela Amodei",
    role: "President & Co-founder — Anthropic",
    company: "Anthropic",
    kardId: "daniela",
    initials: "DA",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Daniela_Amodei_%28cropped%29.jpg/440px-Daniela_Amodei_%28cropped%29.jpg",
    linkedin: "https://www.linkedin.com/in/danielaamodei",
    twitter: "https://x.com/danielaamodei",
  },
  {
    name: "Kanye West",
    role: "Entrepreneur / Yeezy Founder",
    company: "Yeezy",
    kardId: "kanye",
    initials: "KW",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg/440px-Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg",
    linkedin: "https://www.linkedin.com/in/kanyewest",
    twitter: "https://x.com/kanyewest",
  },
];

const BARCODE_BARS = [0,4,7,12,15,19,22,27,30,34,37,42,46,49,53,58,61,65,68,73,76,80,83,88,92,95,99,104,107,111,114,119,122,126,129,134,138];

function Barcode() {
  return (
    <svg width="140" height="36" viewBox="0 0 140 36" aria-hidden="true">
      {BARCODE_BARS.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={0}
          width={i % 3 === 2 ? 3 : i % 2 === 0 ? 2 : 1}
          height={36}
          fill="#555"
        />
      ))}
    </svg>
  );
}

function KardCard({ person }: { person: Person }) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', person.photo);
    setImgError(true);
  };

  return (
    <div className="kard-wrapper">
      <GlareHover
        background="#111111"
        borderRadius="24px"
        borderColor="#2a2a2a"
        glareColor="#ff6600"
        glareOpacity={0.3}
        glareAngle={-45}
        glareSize={200}
        transitionDuration={400}
        className="kard-glow-wrapper"
        style={{ width: '320px' }}
      >
        <div className="kard">
          {/* Header */}
          <div className="kard-header">
            <div className="kard-logo">
              <KardLogo size="sm" isDark muted />
              <span>KARD</span>
            </div>

            <span className="kard-company">{person.company}</span>

            <button className="kard-edit" aria-label="Edit card">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </div>

          {/* Photo */}
          <div className="kard-photo-wrap">
            {!imgError ? (
              <img
                src={person.photo}
                alt={person.name}
                className="kard-photo"
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            ) : (
              <div className="kard-photo-placeholder kard-initials">{person.initials}</div>
            )}
            <div className="orange-corner" />
          </div>

          {/* Identity */}
          <div className="kard-name">{person.name}</div>
          <div className="kard-role">{person.role}</div>

          {/* Socials */}
          <div className="kard-socials">
            {person.linkedin && (
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
            {person.twitter && (
              <a href={person.twitter} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="X / Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
          </div>

          {/* Footer */}
          <div className="kard-footer">
            <div className="barcode-wrap">
              <Barcode />
              <span className="barcode-num">0 35545 82358 78 1</span>
            </div>
            <span className="kard-id">ID : kard.io/{person.kardId}</span>
          </div>
        </div>
      </GlareHover>

      <style jsx>{`
        .kard-wrapper {
          width: 320px;
        }
        .kard {
          width: 320px;
          background: transparent;
          border-radius: 24px;
          padding: 20px 20px 24px;
          color: #fff;
          position: relative;
          border: none;
          font-family: var(--font-sans, system-ui, sans-serif);
          animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Header */
        .kard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          position: relative;
        }
        .kard-logo {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #fff;
        }
        .kard-company {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #aaa;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
        }
        .kard-edit {
          color: #aaa;
          background: #222;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0.5px solid #333;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .kard-edit:hover {
          background: #2a2a2a;
          color: #F97316;
        }

        /* Photo */
        .kard-photo-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          border-radius: 16px;
          overflow: hidden;
          background: #1e1e1e;
          margin-bottom: 18px;
        }
        .kard-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(100%);
        }
        .kard-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kard-initials {
          font-size: 64px;
          font-weight: 700;
          color: #333;
          letter-spacing: -2px;
        }
        .orange-corner {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 80px;
          height: 48px;
          background: #F97316;
          border-radius: 0 24px 0 0;
          transition: width 0.3s ease;
        }
        .kard:hover .orange-corner {
          width: 100px;
        }

        /* Identity */
        .kard-name {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 4px;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .kard-role {
          font-size: 14px;
          color: #888;
          margin: 0 0 16px;
          font-weight: 400;
        }

        /* Socials */
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
          border: 1.5px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ccc;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .social-icon:hover {
          border-color: #F97316;
          color: #F97316;
          background: #1a1a1a;
        }

        /* Footer */
        .kard-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .barcode-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .barcode-num {
          font-size: 9px;
          color: #555;
          letter-spacing: 0.04em;
        }
        .kard-id {
          font-size: 11px;
          color: #666;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

export default function KardDemoCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const changeCard = (newIndex: number | ((prev: number) => number)) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(newIndex);
      setVisible(true);
    }, 350);
  };

  const prev = () => changeCard((c) => (c - 1 + PEOPLE.length) % PEOPLE.length);
  const next = () => changeCard((c) => (c + 1) % PEOPLE.length);

  useEffect(() => {
    if (!playing) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      changeCard((c) => (c + 1) % PEOPLE.length);
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const manualNav = (fn: () => void) => {
    fn();
    setPlaying(false);
    setTimeout(() => setPlaying(true), 3000);
  };

  return (
    <div className="carousel-wrap">
      <div className="nav-row">
        <button className="nav-btn" onClick={() => manualNav(prev)} aria-label="Previous card">‹</button>
        <span className="counter">{current + 1} / {PEOPLE.length}</span>
        <button className="nav-btn" onClick={() => manualNav(next)} aria-label="Next card">›</button>
      </div>

      <div
        className="card-stage"
        onMouseEnter={() => setPlaying(false)}
        onMouseLeave={() => setPlaying(true)}
      >
        <div className={`card-fade ${visible ? 'visible' : ''}`}>
          <KardCard person={PEOPLE[current]!} />
        </div>
      </div>

      <div className="bottom-row">
        <div className="dot-row">
          {PEOPLE.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => { setCurrent(i); setPlaying(false); setTimeout(() => setPlaying(true), 3000); }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="play-btn"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        >
          {playing ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="3" width="4" height="18" rx="1" />
              <rect x="15" y="3" width="4" height="18" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      <style jsx>{`
        .carousel-wrap { display: flex; flex-direction: column; align-items: center; padding: 2rem 0; gap: 0; }
        .nav-row { display: flex; align-items: center; gap: 16px; margin-bottom: 1.5rem; }
        .nav-btn {
          background: #111;
          border: 1px solid #333;
          color: #fff;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 20px;
          line-height: 1;
          transition: background 0.2s, border-color 0.2s;
        }
        .nav-btn:hover { background: #F97316; border-color: #F97316; }
        .counter { font-size: 13px; color: #888; min-width: 56px; text-align: center; }
        .card-stage { display: flex; justify-content: center; }
        .card-fade {
          opacity: 0;
          transform: translateY(12px) scale(0.96);
          transition: opacity 350ms ease, transform 350ms ease;
        }
        .card-fade.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .bottom-row { display: flex; align-items: center; gap: 10px; margin-top: 1.25rem; }
        .dot-row { display: flex; gap: 6px; }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #333;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 0.2s;
        }
        .dot.active { background: #F97316; }
        .play-btn {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #222;
          border: 1px solid #333;
          color: #aaa;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          padding: 0;
        }
        .play-btn:hover { background: #F97316; border-color: #F97316; color: #fff; }
      `}</style>
    </div>
  );
}