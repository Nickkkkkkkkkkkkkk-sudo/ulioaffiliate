import { Instagram, Youtube, Twitter } from "lucide-react";

const platforms = [
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "tiktok", label: "TikTok", icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.27 8.27 0 0 0 4.76 1.5V6.77a4.83 4.83 0 0 1-1-.08z"/>
    </svg>
  )},
  { id: "youtube", label: "YouTube", icon: Youtube },
  { id: "x", label: "X (Twitter)", icon: Twitter },
];

const StepPlatform = ({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (platform: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
        Your primary platform
      </h2>
      <p className="text-muted-foreground mb-10">
        Select the platform where you have the strongest presence.
      </p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {platforms.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`glass-card flex flex-col items-center gap-3 py-8 ${
              selected === id ? "glass-card-selected" : ""
            }`}
          >
            <Icon className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepPlatform;
