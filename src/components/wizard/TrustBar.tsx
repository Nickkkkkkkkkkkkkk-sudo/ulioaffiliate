const logos = [
  { label: "AI", icon: "✦" },
  { label: "SaaS", icon: "◈" },
  { label: "Tech", icon: "⬡" },
  { label: "Cloud", icon: "☁" },
  { label: "Data", icon: "◉" },
];

const TrustBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-20 mb-8">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-6">
        Trusted across industries
      </p>
      <div className="flex items-center justify-center gap-8 sm:gap-12">
        {logos.map((logo) => (
          <div
            key={logo.label}
            className="trust-logo group flex flex-col items-center gap-1.5 cursor-default"
          >
            <span className="text-2xl sm:text-3xl opacity-30 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:text-primary group-hover:drop-shadow-[0_0_12px_hsla(271,76%,53%,0.6)]">
              {logo.icon}
            </span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/40 transition-colors duration-500 group-hover:text-primary">
              {logo.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
