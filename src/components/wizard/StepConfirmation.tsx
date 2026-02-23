import { CheckCircle2 } from "lucide-react";
import type { WizardData } from "./AffiliateWizard";

const StepConfirmation = ({ data }: { data: WizardData }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="glass-panel p-10 flex flex-col items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Application Received
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Thanks, <span className="font-medium text-foreground">{data.fullName}</span>! We'll review
          your application and reach out to{" "}
          <span className="font-medium text-foreground">{data.email}</span> within 48 hours.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground capitalize">
            {data.platform}
          </span>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {data.reach} followers
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepConfirmation;
