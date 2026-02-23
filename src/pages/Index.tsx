import { useState } from "react";
import AffiliateWizard from "@/components/wizard/AffiliateWizard";

const Index = () => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 sm:px-10 py-5">
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-70"
        >
          ulio<span className="text-primary">.ai</span>
        </button>
      </header>
      <AffiliateWizard key={resetKey} />
    </main>
  );
};

export default Index;
