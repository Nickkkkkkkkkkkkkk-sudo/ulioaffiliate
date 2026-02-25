import { ArrowLeft } from "lucide-react";

const tiers = [
  { id: "under10k", label: "Under 10K", description: "Growing creator or haven't started posting yet" },
  { id: "10k-50k", label: "10K – 50K", description: "Rising influence" },
  { id: "50k-100k", label: "50K – 100K", description: "Established presence" },
  { id: "100k+", label: "100K+", description: "Major reach" },
];

const StepReach = ({
  selected,
  onSelect,
  onBack,
}: {
  selected: string;
  onSelect: (tier: string) => void;
  onBack: () => void;
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
        Your audience size
      </h2>
      <p className="text-muted-foreground mb-10">
        How many followers do you have on your primary platform?
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
        {tiers.map(({ id, label, description }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`glass-card flex flex-col items-center gap-2 py-7 ${
              selected === id ? "glass-card-selected" : ""
            }`}
          >
            <span className="text-lg font-semibold text-foreground">{label}</span>
            <span className="text-xs text-muted-foreground">{description}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
    </div>
  );
};

export default StepReach;
