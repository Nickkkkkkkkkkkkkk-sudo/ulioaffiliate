import { useEffect, useRef, useState } from "react";
import { Link2, Film, DollarSign } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Grab Your Custom Partner Link",
    description:
      "Sign up in 60 seconds to get your unique tracking link and access your private partner dashboard.",
    icon: Link2,
  },
  {
    number: "02",
    title: 'Remix Our "High-Hook" Content Library',
    description:
      "Access our library of raw screen recordings showing ulio.ai receptionists being built, sold, and booking appointments. Download these clips and add your own voiceover, face-cam, or captions to make them your own.",
    icon: Film,
  },
  {
    number: "03",
    title: "Post, Tag, and Get Paid Monthly",
    description:
      'Share your "remixed" videos on TikTok, Reels, or X. Every time a business signs up through your link, you earn a recurring commission for the life of that customer.',
    icon: DollarSign,
  },
];

const HowItWorksSteps = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-col items-center px-6 pb-32 pt-8"
    >
      {/* Section heading */}
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary/50 mb-3">
        How It Works
      </p>
      <h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-2xl mb-14"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          textShadow:
            "0 0 30px rgba(255,255,255,0.15), 0 0 6px rgba(255,255,255,0.3)",
        }}
      >
        Turn Your Content into{" "}
        <span
          className="text-primary"
          style={{
            textShadow:
              "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3)",
          }}
        >
          Recurring Commissions
        </span>
      </h2>

      {/* Steps */}
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {steps.map((step, i) => (
          <div
            key={step.number}
            className="flex items-start gap-5 sm:gap-6 transition-all duration-700 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.97)",
              filter: visible ? "blur(0px)" : "blur(6px)",
              transitionDelay: `${i * 200}ms`,
            }}
          >
            {/* Left: number + line */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  boxShadow: "0 0 20px hsla(271,76%,53%,0.15)",
                }}
              >
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              {i < steps.length - 1 && (
                <div
                  className="w-px flex-1 min-h-[40px] mt-2 transition-all duration-700 ease-out"
                  style={{
                    background:
                      "linear-gradient(to bottom, hsl(var(--primary) / 0.3), transparent)",
                    opacity: visible ? 1 : 0,
                    transitionDelay: `${i * 200 + 300}ms`,
                  }}
                />
              )}
            </div>

            {/* Right: content */}
            <div className="pt-1 pb-4">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary/40">
                Step {step.number}
              </span>
              <h3
                className="text-base sm:text-lg font-bold text-foreground mt-1 mb-2"
                style={{
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSteps;
