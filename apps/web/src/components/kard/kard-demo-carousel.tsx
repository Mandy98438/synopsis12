"use client";

import { useState, useEffect, useRef } from "react";
import GlareHover from "@/components/core/glare-hover";
import { Kard } from "./Kard";
import { KARD_MODES, type KardMode } from "./kardModes";

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
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Elon_Musk_2015.jpg&width=440",
    linkedin: "https://www.linkedin.com/in/elon-musk-0a2b8b1",
    twitter: "https://x.com/elonmusk",
  },
  {
    name: "Satya Nadella",
    role: "Chairman & CEO — Microsoft",
    company: "Microsoft",
    kardId: "satya",
    initials: "SN",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Satya_Nadella.jpg&width=440",
    linkedin: "https://www.linkedin.com/in/satyanadella",
    twitter: "https://x.com/satyanadella",
  },
  {
    name: "Sundar Pichai",
    role: "CEO — Google & Alphabet",
    company: "Alphabet",
    kardId: "sundar",
    initials: "SP",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Sundar_Pichai_(cropped).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/sundarpichai",
    twitter: "https://x.com/sundarpichai",
  },
  {
    name: "Tim Cook",
    role: "CEO — Apple",
    company: "Apple",
    kardId: "tim",
    initials: "TC",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Tim_Cook_(2017,_cropped).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/tim-cook-3a1a4",
    twitter: "https://x.com/tim_cook",
  },
  {
    name: "Jensen Huang",
    role: "Founder & CEO — NVIDIA",
    company: "NVIDIA",
    kardId: "jensen",
    initials: "JH",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Jensen_Huang_(cropped).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/jenhsunhuang",
  },
  {
    name: "Garry Tan",
    role: "President & CEO — Y Combinator",
    company: "Y Combinator",
    kardId: "garry",
    initials: "GT",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Garry_Tan,_Web_Summit_2018,_November_6_SD5_6949_(45700698642)(portrait_4x3_crop).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/garrytan",
    twitter: "https://x.com/garrytan",
  },
  {
    name: "Paul Graham",
    role: "Founder — Y Combinator",
    company: "Y Combinator",
    kardId: "pg",
    initials: "PG",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Paul_Graham_LI.jpg&width=440",
    linkedin: "https://www.linkedin.com/in/paulgraham",
    twitter: "https://x.com/paulg",
  },
  {
    name: "Dario Amodei",
    role: "CEO & Co-founder — Anthropic",
    company: "Anthropic",
    kardId: "dario",
    initials: "DA",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Dario_Amodei_2024_(cropped).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/darioamodei",
    twitter: "https://x.com/DarioAmodei",
  },
  {
    name: "Daniela Amodei",
    role: "President & Co-founder — Anthropic",
    company: "Anthropic",
    kardId: "daniela",
    initials: "DA",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Daniela_Amodei_(cropped).jpg&width=440",
    linkedin: "https://www.linkedin.com/in/danielaamodei",
    twitter: "https://x.com/danielaamodei",
  },
  {
    name: "Kanye West",
    role: "Entrepreneur / Yeezy Founder",
    company: "Yeezy",
    kardId: "kanye",
    initials: "KW",
    photo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg&width=440",
    linkedin: "https://www.linkedin.com/in/kanyewest",
  },
];

export default function KardDemoCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [mode, setMode] = useState<KardMode>("dark");
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
        <div className="mode-switcher" aria-label="Card style">
          {(Object.keys(KARD_MODES) as KardMode[]).map((m) => (
            <button
              key={m}
              className={`mode-dot ${mode === m ? "active" : ""}`}
              onClick={() => setMode(m)}
              aria-label={`${KARD_MODES[m].label} mode`}
              style={{ background: KARD_MODES[m].swatch }}
            />
          ))}
        </div>
        <div className={`card-fade ${visible ? 'visible' : ''}`}>
          <GlareHover
            background={mode === "dark" ? "#111111" : "transparent"}
            borderRadius="24px"
            borderColor={mode === "dark" ? "#2a2a2a" : "transparent"}
            glareColor="#ff6600"
            glareOpacity={0.3}
            glareAngle={-45}
            glareSize={200}
            transitionDuration={400}
            className="kard-glow-wrapper"
            style={{ width: "320px" }}
          >
            <Kard
              mode={mode}
              imageUrl={PEOPLE[current]!.photo}
              name={PEOPLE[current]!.name}
              title={PEOPLE[current]!.role}
              company={PEOPLE[current]!.company}
              initials={PEOPLE[current]!.initials}
              barcodeId={PEOPLE[current]!.kardId}
              socialLinks={{
                linkedin: PEOPLE[current]!.linkedin,
                twitter: PEOPLE[current]!.twitter,
              }}
            />
          </GlareHover>
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
        .card-stage { display: flex; justify-content: center; position: relative; }
        .mode-switcher {
          position: absolute;
          left: -44px;
          top: 18px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(0,0,0,0.08);
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
        }
        .mode-dot {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          cursor: pointer;
          padding: 0;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.14);
        }
        .mode-dot.active { box-shadow: 0 0 0 2px #F97316; }
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
