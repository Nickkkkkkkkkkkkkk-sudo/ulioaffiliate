const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const pct = (current / total) * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full items-center justify-between text-xs font-medium text-muted-foreground">
        <span>Step {current} of {total}</span>
        <span>{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
