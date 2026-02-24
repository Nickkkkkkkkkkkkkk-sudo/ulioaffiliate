import { useState, useCallback } from "react";
import StepHero from "@/components/wizard/StepHero";
import StepPlatform from "@/components/wizard/StepPlatform";
import StepReach from "@/components/wizard/StepReach";
import StepIdentity from "@/components/wizard/StepIdentity";
import StepConfirmation from "@/components/wizard/StepConfirmation";
import ProgressBar from "@/components/wizard/ProgressBar";
import ScarcityTicker from "@/components/wizard/ScarcityTicker";

export interface WizardData {
  platform: string;
  reach: string;
  handle: string;
  fullName: string;
  email: string;
}

const AffiliateWizard = () => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [data, setData] = useState<WizardData>({
    platform: "",
    reach: "",
    handle: "",
    fullName: "",
    email: "",
  });

  const goTo = useCallback((next: number) => {
    setAnimating(true);
    setTimeout(() => {
      setStep(next);
      setAnimating(false);
    }, 350);
  }, []);

  const updateData = useCallback((partial: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const totalSteps = 5;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20">
      {/* SVG filter for liquid distortion on hover */}
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-primary/3 blur-3xl animate-float" style={{ animationDelay: "5s" }} />
      </div>

      {/* Hero step renders full-width (no wrapper) */}
      {step === 0 && (
        <div className={animating ? "step-exit" : "liquid-transition"} key={step}>
          <StepHero onStart={() => goTo(1)} />
        </div>
      )}

      {/* Wizard steps 1-4 housed inside a centered glass wrapper */}
      {step > 0 && (
        <div className="glass-wrapper w-full max-w-lg px-6 sm:px-10 py-10 sm:py-14">
          {step < 5 && (
            <div className="mb-10">
              <ProgressBar current={step} total={totalSteps - 1} />
            </div>
          )}
          <div className={animating ? "step-exit" : "liquid-transition"} key={step}>
            {step === 1 && (
              <StepPlatform
                selected={data.platform}
                onSelect={(p) => {
                  updateData({ platform: p });
                  goTo(2);
                }}
              />
            )}
            {step === 2 && (
              <StepReach
                selected={data.reach}
                onSelect={(r) => {
                  updateData({ reach: r });
                  goTo(3);
                }}
                onBack={() => goTo(1)}
              />
            )}
            {step === 3 && (
              <StepIdentity
                data={data}
                onUpdate={updateData}
                onSubmit={() => goTo(4)}
                onBack={() => goTo(2)}
              />
            )}
            {step === 4 && <StepConfirmation data={data} />}
          </div>
        </div>
      )}

      {step < 4 && <ScarcityTicker />}
    </div>
  );
};

export default AffiliateWizard;
