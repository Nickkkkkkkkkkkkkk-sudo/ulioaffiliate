const ScarcityTicker = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-panel flex items-center gap-2.5 px-5 py-2.5 rounded-full">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
        </span>
        <span className="text-xs font-medium text-foreground/80 whitespace-nowrap">
          Accepting <span className="font-bold text-primary">5</span> New Partners for {currentMonth}
        </span>
      </div>
    </div>
  );
};

export default ScarcityTicker;
