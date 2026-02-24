import { Dumbbell, Home, ShieldCheck, Calculator } from "lucide-react";

const targets = [
  {
    name: "Anytime Fitness",
    icon: Dumbbell,
    description: "Automate 24/7 membership inquiries and trial bookings.",
  },
  {
    name: "RE/MAX",
    icon: Home,
    description: "Instantly schedule property viewings and lead follow-ups for agents.",
  },
  {
    name: "ServiceMaster",
    icon: ShieldCheck,
    description: "Capture and qualify emergency restoration leads instantly.",
  },
  {
    name: "H&R Block",
    icon: Calculator,
    description: "Seamlessly manage appointment surges during peak tax seasons.",
  },
];

const TargetMarket = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-24 mb-8">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-4">
        Built for industry leaders
      </p>
      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center mb-12">
        Who uses <span className="text-primary">ulio.ai</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {targets.map((t) => (
          <div key={t.name} className="target-card flex gap-5 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8">
              <t.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold tracking-tight text-foreground mb-1">
                {t.name}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetMarket;
