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


    </div>
  );
};

export default AffiliateStats;
