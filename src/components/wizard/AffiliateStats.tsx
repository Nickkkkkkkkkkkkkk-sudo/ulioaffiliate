import { useState, useEffect } from "react";
import win1 from "@/assets/win-1.png";
import win2 from "@/assets/win-2.png";
import win3 from "@/assets/win-3.png";
import win4 from "@/assets/win-4.png";

const wins = [win1, win2, win3, win4];

const AffiliateStats = () => {
  const [totalEarnings, setTotalEarnings] = useState(247_832);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalEarnings((prev) => prev + Math.floor(Math.random() * 12 + 3));
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 flex flex-col items-center gap-8">
      {/* Earnings ticker */}
      <div className="glass-panel px-6 py-4 flex flex-col items-center gap-1">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Total Affiliate Earnings
        </span>
        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-primary tabular-nums">
          ${totalEarnings.toLocaleString()}
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
