import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./App.css";

// Import your pages
import AIstrategist from "./pages/AIstrategist";
import CommunityBuilder from "./pages/CommunityBuilder";
import SpeakingWorkshops from "./pages/SpeakingWorkshops";
import MeetJermaine from "./pages/MeetJermaine";

gsap.registerPlugin(CustomEase);

// =======================
// 🏠 HOME PAGE
// =======================
const tiles = [
  { label: "AI Strategist", href: "/ai-strategist" },
  { label: "Community Builder", href: "/community-builder" },
  { label: "Speaking & Workshops", href: "/speaking-workshops" },
  { label: "Meet Jermaine", href: "/meet-jermaine" },
];

function Home() {
  return (
    <section className="home-section flex flex-col items-center justify-center h-screen bg-black text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-12">
        Where should we start?
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tiles.map((t) => (
          <li
            key={t.label}
            className="card bg-gray-800 rounded-lg p-6 transform transition duration-500 hover:scale-105"
          >
            <Link to={t.href} className="flex flex-col items-center">
              <div className="avatar w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                {t.label[0]}
              </div>
              <div className="label text-white text-lg font-semibold">
                {t.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="hint mt-6 text-gray-400 text-sm md:text-base">
        Click any pillar to explore Jermaine’s expertise.
      </p>
    </section>
  );
}

// =======================
// 🎬 JERMAINE SPLASH (AUTO SOUND)
// =======================
function JermaineSplash({ onFinish }: { onFinish: () => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const letters = ["J", "E1", "R", "M", "A", "I", "N", "E2", "P", "E3", "G", "U", "S", "E4"];
    const master_tl = gsap.timeline({ onComplete: onFinish });

    const movement_tl = gsap.timeline();
    movement_tl
      .from(svg, { opacity: 0, duration: 0.7 }, 0)
      .from(
        svg,
        {
          xPercent: 20,
          duration: 2,
          ease: CustomEase.create("custom", "M0,0,C0.358,0.144,0.098,1,1,1"),
        },
        0.5
      );

    letters.forEach((l, i) => {
      master_tl.add(
        gsap.from(`#letter${l}`, {
          scaleY: 0,
          opacity: 0,
          transformOrigin: "bottom center",
          duration: 0.4,
          ease: "power4.out",
        }),
        0.8 + i * 0.1
      );
    });

    const exit_tl = gsap.timeline();
    exit_tl.to(svg, { opacity: 0, duration: 0.8 });
    master_tl.add(movement_tl, 0);
    master_tl.add(exit_tl, 6);

    // ✅ Auto-play sound (no click)
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1.0;
      const playAudio = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.warn("Autoplay blocked, retrying...");
          setTimeout(() => {
            audio.play().catch(() => {});
          }, 500);
        }
      };
      playAudio();
    }
  }, [onFinish]);

  return (
    <div className="netflix-container flex justify-center items-center h-screen bg-black">
      <audio
        ref={audioRef}
        src="https://storage.googleapis.com/msgsndr/9xAHTKKgj00RK5KffYr5/media/68f2c325175e59dba6959265.webm"
        preload="auto"
      />
      <svg ref={svgRef} viewBox="0 0 2300 400" className="max-w-[2000px] w-[900px]">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2EABFF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>

        {(
          [
            ["J", 50],
            ["E1", 210],
            ["R", 360],
            ["M", 530],
            ["A", 730],
            ["I", 870],
            ["N", 950],
            ["E2", 1120],
            ["P", 1320],
            ["E3", 1480],
            ["G", 1620],
            ["U", 1790],
            ["S", 1950],
            ["E4", 2090],
          ] as [string, number][]
        ).map(([id, x]) => (
          <text
            key={id}
            id={`letter${id}`}
            className="base"
            x={x}
            y={270}
            fontFamily="Impact, sans-serif"
            fontSize="230"
            fill="url(#blueGradient)"
          >
            {id.replace(/\d/, "")}
          </text>
        ))}
      </svg>
    </div>
  );
}

// =======================
// 🚀 MAIN APP
// =======================
export default function App() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(false);

  // ✅ Only show splash on first visit OR reload on homepage
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited && location.pathname === "/") {
      setShowSplash(true);
      sessionStorage.setItem("hasVisited", "true");
    }
  }, [location.pathname]);

  return (
    <main className="main bg-black">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <JermaineSplash onFinish={() => setShowSplash(false)} />
          </motion.div>
        ) : (
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/ai-strategist" element={<AIstrategist />} />
            <Route path="/community-builder" element={<CommunityBuilder />} />
            <Route path="/speaking-workshops" element={<SpeakingWorkshops />} />
            <Route path="/meet-jermaine" element={<MeetJermaine />} />
          </Routes>
        )}
      </AnimatePresence>
    </main>
  );
}
