import { FileText, Handshake, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Submit your application in under 60 seconds.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Partner",
    description: "Get approved and receive your unique affiliate link.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Scale",
    description: "Earn recurring commissions as your audience grows.",
    icon: TrendingUp,
  },
];

const HowItWorks = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-14 mb-4">
      <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-8">
        How it works
      </h3>
      <div className="relative flex flex-col sm:flex-row items-stretch gap-6 sm:gap-0">
        {/* Connecting liquid glass line — horizontal on desktop */}
        <div className="hidden sm:block absolute top-1/2 left-[15%] right-[15%] h-px -translate-y-1/2 z-0">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
          <div className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-sm" />
        </div>

        {/* Connecting liquid glass line — vertical on mobile */}
        <div className="sm:hidden absolute left-1/2 top-[10%] bottom-[10%] w-px -translate-x-1/2 z-0">
          <div className="h-full w-full rounded-full bg-gradient-to-b from-transparent via-primary/25 to-transparent" />
        </div>

        {steps.map((step) => (
          <div key={step.number} className="relative z-10 flex-1 flex justify-center">
            <div className="hiw-card glass-panel p-6 sm:p-7 flex flex-col items-center text-center w-full max-w-[220px] transition-all duration-500 hover:scale-[1.03]"
              style={{
                borderImage: "linear-gradient(135deg, hsla(271,76%,53%,0.15), hsla(271,76%,53%,0.05)) 1",
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-primary/50 mb-1">
                STEP {step.number}
              </span>
              <h4 className="text-lg font-bold tracking-tight text-foreground mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
