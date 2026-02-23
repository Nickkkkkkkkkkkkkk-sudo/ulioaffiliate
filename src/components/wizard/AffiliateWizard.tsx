import { useState, useCallback } from "react";
import { Instagram, Youtube, Twitter } from "lucide-react";
import StepHero from "@/components/wizard/StepHero";
import StepPlatform from "@/components/wizard/StepPlatform";
import StepReach from "@/components/wizard/StepReach";
import StepIdentity from "@/components/wizard/StepIdentity";
import StepConfirmation from "@/components/wizard/StepConfirmation";
import ProgressBar from "@/components/wizard/ProgressBar";

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
      {/* Ambient background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-primary/8 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {step > 0 && step < 5 && (
        <div className="mb-12 w-full max-w-md">
          <ProgressBar current={step} total={totalSteps - 1} />
        </div>
      )}

      <div className={animating ? "step-exit" : "liquid-transition"} key={step}>
        {step === 0 && <StepHero onStart={() => goTo(1)} />}
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
  );
};

export default AffiliateWizard;
