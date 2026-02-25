import { useState } from "react";
import AffiliateWizard from "@/components/wizard/AffiliateWizard";

const Index = () => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <main className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 z-50 px-6 sm:px-10 py-5">
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="text-xl font-bold tracking-tight text-foreground transition-all hover:opacity-80"
          style={{ textShadow: "0 0 20px hsla(271, 76%, 53%, 0.5), 0 0 40px hsla(271, 76%, 53%, 0.2)" }}
        >
          ulio<span className="text-primary">.ai</span>
        </button>
      </header>
      <AffiliateWizard key={resetKey} />
    </main>
  );
};

export default Index;
