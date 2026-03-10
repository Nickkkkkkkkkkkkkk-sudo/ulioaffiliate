import { useState, useEffect, useRef, memo } from "react";
import viewsStats from "@/assets/views-stats.png";

const START = 248_430;
const END = 256_378;
const RANGE = END - START;
const DAY_MS = 24 * 60 * 60 * 1000;

function getEarnings() {
  const now = Date.now();
  const startOfDay = new Date(now).setHours(0, 0, 0, 0);
  const progress = (now - startOfDay) / DAY_MS;
  return START + Math.floor((progress * RANGE) / 30) * 30;
}

const AnimatedDigit = memo(({ digit, index }: { digit: string; index: number }) => {
  const isNumber = /\d/.test(digit);
  const prevRef = useRef(digit);
  const [displayDigit, setDisplayDigit] = useState(digit);
  const [prevDisplayDigit, setPrevDisplayDigit] = useState(digit);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (digit !== prevRef.current && isNumber) {
      setPrevDisplayDigit(prevRef.current);
      setDisplayDigit(digit);
      setShouldAnimate(true);
    } else if (!isNumber) {
      setDisplayDigit(digit);
    }
    prevRef.current = digit;
  }, [digit, isNumber]);

  const handleTransitionEnd = () => {
    setShouldAnimate(false);
    setPrevDisplayDigit(displayDigit);
  };

  if (!isNumber) {
    return <span>{digit}</span>;
  }

  return (
    <span
      className="inline-block overflow-hidden"
      style={{ width: "0.62em", height: "1.2em", position: "relative", verticalAlign: "bottom" }}
    >
      <span
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: 0,
          right: 0,
          transition: shouldAnimate ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
          transform: shouldAnimate ? "translateY(-1.2em)" : "translateY(0)",
        }}
      >
        <span style={{ height: "1.2em", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {shouldAnimate ? prevDisplayDigit : displayDigit}
        </span>
        {shouldAnimate && (
          <span style={{ height: "1.2em", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {displayDigit}
          </span>
        )}
      </span>
    </span>
  );
});
AnimatedDigit.displayName = "AnimatedDigit";

const AffiliateStats = () => {
  const [earnings, setEarnings] = useState(getEarnings);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings((prev) => {
        const target = getEarnings();
        if (target > prev) return prev + 30;
        return target;
      });
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const formatted = `$${earnings.toLocaleString()}`;

  return (
    <div className="w-full mt-16 flex flex-col items-center gap-8">
      <div className="glass-panel px-6 py-4 flex flex-col items-center gap-1 mx-auto">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Total Affiliate Earnings
        </span>
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-primary tabular-nums flex">
          {formatted.split("").map((char, i) => (
            <AnimatedDigit key={i} digit={char} index={i} />
          ))}
        </span>
      </div>

      {/* Views to Money graphic */}
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 text-lg sm:text-xl font-semibold text-foreground">
          <span>👁️ Views</span>
          <span className="text-primary text-2xl">→</span>
          <span>💰 Money</span>
        </div>
        <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg">
          <img
            src={viewsStats}
            alt="View counts showing viral reach turning into earnings"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Purple gradient background section with glassmorphism card */}
      <div className="relative w-full rounded-3xl overflow-hidden py-16 px-4 mt-4">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[hsl(271,50%,12%)]">
          <div className="absolute inset-0 opacity-60 animate-gradient-move"
            style={{
              background: "radial-gradient(ellipse at 20% 50%, hsla(271,76%,40%,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsla(280,80%,50%,0.4) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, hsla(260,70%,35%,0.5) 0%, transparent 55%)",
            }}
          />
          <div className="absolute inset-0 opacity-40 animate-gradient-move-reverse"
            style={{
              background: "radial-gradient(ellipse at 70% 60%, hsla(290,60%,45%,0.5) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, hsla(265,80%,55%,0.3) 0%, transparent 55%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Glassmorphism Card */}
          <div className="relative w-full max-w-[400px] h-[300px] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(224, 242, 254, 0.1)",
              backdropFilter: "blur(12px) saturate(120%)",
              WebkitBackdropFilter: "blur(12px) saturate(120%)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 8px 24px 0 rgba(12, 74, 110, 0.15), inset 0px 0px 4px 2px rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Reflection overlays */}
            <div className="absolute inset-0 pointer-events-none rounded-inherit z-[1]"
              style={{ background: "linear-gradient(to left top, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)" }}
            />
            <div className="absolute inset-0 pointer-events-none rounded-inherit z-[1]"
              style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 100%)" }}
            />

            <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 text-white" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-primary" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm m-0">Jane Doe</p>
                    <p className="text-xs opacity-70 m-0">UX Designer</p>
                  </div>
                </div>
                <svg className="w-5 h-5 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>

              {/* Body */}
              <div className="text-center mt-2">
                <h3 className="text-lg font-bold mb-1">Styled Component</h3>
                <p className="text-sm opacity-70 mb-4">This is a sample of how your content might look inside.</p>
                <button className="w-full py-2 px-4 rounded-lg font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-white/20"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  Get Started
                </button>
              </div>

              {/* Tip */}
              <p className="text-xs text-center text-[#e0e6ed] mt-4">
                Tip: Try adjusting the sliders and colors to see real-time changes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateStats;
