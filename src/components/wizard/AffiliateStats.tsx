import { useState, useEffect } from "react";

const results = [
  { name: "Sarah K.", platform: "Instagram", earned: "$4,230", period: "last 30 days" },
  { name: "Marcus T.", platform: "YouTube", earned: "$8,715", period: "last 30 days" },
  { name: "Jenna L.", platform: "TikTok", earned: "$3,890", period: "last 30 days" },
  { name: "David R.", platform: "Twitter", earned: "$2,140", period: "last 30 days" },
];

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

      {/* Results grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((r) => (
          <div key={r.name} className="glass-panel px-5 py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{r.name}</span>
              <span className="text-xs text-muted-foreground">{r.platform} · {r.period}</span>
            </div>
            <span className="text-sm font-bold text-primary">{r.earned}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateStats;
