import { useState } from "react";
import AffiliateWizard from "@/components/wizard/AffiliateWizard";

const Index = () => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-60 animate-gradient-move"
          style={{
            background: "radial-gradient(ellipse at 20% 50%, hsla(271,76%,40%,0.6) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, hsla(280,80%,50%,0.4) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, hsla(260,70%,35%,0.5) 0%, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 opacity-40 animate-gradient-move-reverse"
          style={{
            background: "radial-gradient(ellipse at 70% 60%, hsla(290,60%,45%,0.5) 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, hsla(265,80%,55%,0.3) 0%, transparent 55%)",
          }}
        />
      </div>

      <header className="fixed top-0 left-0 z-50 px-4 py-3">
        <button
          onClick={() => setResetKey((k) => k + 1)}
          className="text-xl font-bold tracking-tight text-foreground transition-all hover:opacity-80"
          style={{ textShadow: "0 0 20px hsla(271, 76%, 53%, 0.5), 0 0 40px hsla(271, 76%, 53%, 0.2)" }}
        >
          ulio<span className="text-primary">.ai</span>
        </button>
      </header>
      <div className="relative z-10">
        <AffiliateWizard key={resetKey} />
      </div>
    </main>
  );
};

export default Index;
