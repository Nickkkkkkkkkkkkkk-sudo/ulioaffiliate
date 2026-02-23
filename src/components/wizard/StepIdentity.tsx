import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { WizardData } from "./AffiliateWizard";

const StepIdentity = ({
  data,
  onUpdate,
  onSubmit,
  onBack,
}: {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.handle.trim()) e.handle = "Required";
    if (!data.fullName.trim()) e.fullName = "Required";
    if (!data.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto w-full">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
        Almost there
      </h2>
      <p className="text-muted-foreground mb-10">
        Tell us a bit about yourself.
      </p>
      <form onSubmit={handleSubmit} className="glass-panel p-8 w-full space-y-5">
        <div className="text-left">
          <label className="block text-sm font-medium text-foreground mb-1.5">Social Media Handle</label>
          <input
            type="text"
            placeholder="@yourhandle"
            value={data.handle}
            onChange={(e) => onUpdate({ handle: e.target.value })}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          {errors.handle && <span className="text-xs text-destructive mt-1 block">{errors.handle}</span>}
        </div>
        <div className="text-left">
          <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
          <input
            type="text"
            placeholder="Jane Doe"
            value={data.fullName}
            onChange={(e) => onUpdate({ fullName: e.target.value })}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          {errors.fullName && <span className="text-xs text-destructive mt-1 block">{errors.fullName}</span>}
        </div>
        <div className="text-left">
          <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
          <input
            type="email"
            placeholder="you@email.com"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          {errors.email && <span className="text-xs text-destructive mt-1 block">{errors.email}</span>}
        </div>
        <button type="submit" className="glow-button w-full mt-4 text-base py-4 rounded-xl">
          Submit Application
        </button>
      </form>
      <button
        onClick={onBack}
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
    </div>
  );
};

export default StepIdentity;
