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
  return START + Math.floor(progress * RANGE);
}

/* Single animated digit with vertical scroll */
const AnimatedDigit = memo(({ digit }: { digit: string }) => {
  const isNumber = /\d/.test(digit);
  const prevDigit = useRef(digit);
  const [from, setFrom] = useState(digit);
  const [to, setTo] = useState(digit);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit.current && isNumber) {
      setFrom(prevDigit.current);
      setTo(digit);
      setAnimating(true);
      const t = setTimeout(() => {
        setAnimating(false);
        setFrom(digit);
      }, 400);
      prevDigit.current = digit;
      return () => clearTimeout(t);
    }
    prevDigit.current = digit;
  }, [digit, isNumber]);

  if (!isNumber) {
    return <span className="inline-block">{digit}</span>;
  }

  return (
    <span className="relative inline-block w-[0.62em] h-[1.15em] overflow-hidden align-bottom">
      <span
        className="absolute left-0 right-0 flex flex-col items-center transition-transform duration-400 ease-out"
        style={{ transform: animating ? "translateY(-50%)" : "translateY(0)" }}
      >
        <span className="h-[1.15em] flex items-center justify-center">{from}</span>
        <span className="h-[1.15em] flex items-center justify-center">{to}</span>
      </span>
    </span>
  );
});
AnimatedDigit.displayName = "AnimatedDigit";

const AffiliateStats = () => {
  const [earnings, setEarnings] = useState(getEarnings);

  useEffect(() => {
    const interval = setInterval(() => {
      setEarnings(getEarnings());
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const formatted = `$${earnings.toLocaleString()}`;

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 flex flex-col items-center gap-8">
      {/* Earnings ticker */}
      <div className="glass-panel px-6 py-4 flex flex-col items-center gap-1">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Total Affiliate Earnings
        </span>
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-primary tabular-nums flex">
          {formatted.split("").map((char, i) => (
            <AnimatedDigit key={i} digit={char} />
          ))}
        </span>
      </div>

      {/* Win receipts */}
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
