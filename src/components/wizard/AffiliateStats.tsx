import { useState, useEffect, useRef, memo } from "react";
import win1 from "@/assets/win-1.png";
import win2 from "@/assets/win-2.png";
import win3 from "@/assets/win-3.png";
import win4 from "@/assets/win-4.png";

const wins = [win1, win2, win3, win4];

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
    <div className="w-full max-w-2xl mx-auto mt-16 flex flex-col items-center gap-8">
      <div className="glass-panel px-6 py-4 flex flex-col items-center gap-1">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Total Affiliate Earnings
        </span>
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-primary tabular-nums flex">
          {formatted.split("").map((char, i) => (
            <AnimatedDigit key={i} digit={char} index={i} />
          ))}
        </span>
      </div>

      <div className="w-full grid grid-cols-2 gap-3">
        {wins.map((src, i) => (
          <div key={i} className="glass-panel overflow-hidden rounded-xl">
            <img
              src={src}
              alt={`Affiliate payout receipt ${i + 1}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateStats;
