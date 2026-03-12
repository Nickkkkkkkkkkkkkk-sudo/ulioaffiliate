const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">

      {/* Pill-shaped glassmorphism header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <nav
          className="flex items-center gap-6 px-6 py-2.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 0 4px rgba(255,255,255,0.06)",
          }}
        >
          <span
            className="text-lg font-bold tracking-tight text-foreground"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              textShadow: "0 0 16px hsla(271,76%,53%,0.5)",
            }}
          >
            ulio<span className="text-primary">.ai</span>
          </span>
          <div className="h-4 w-px bg-foreground/10" />
          <a href="#about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </header>

      {/* Hero section — pushed to top */}
      <section className="relative z-10 flex flex-col items-center pt-24 pb-8 px-6">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary/60 mb-4">
          Affiliate Program
        </p>
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-snug max-w-2xl"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            textShadow:
              "0 0 40px rgba(255,255,255,0.2), 0 0 80px rgba(255,255,255,0.06), 0 0 6px rgba(255,255,255,0.4)",
          }}
        >
          The Most{" "}
          <span
            className="text-primary"
            style={{
              textShadow:
                "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3), 0 0 4px hsla(271,76%,53%,0.8)",
            }}
          >
            "Post-able"
          </span>{" "}
          AI Tool of 2026 is Now{" "}
          <span
            className="text-primary"
            style={{
              textShadow:
                "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3), 0 0 4px hsla(271,76%,53%,0.8)",
            }}
          >
            Paying Affiliates
          </span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-md text-center leading-relaxed">
          Share ulio.ai with your audience and earn on every conversion. It's that simple.
        </p>
      </section>

      {/* Video placeholder */}
      <section className="relative z-10 flex justify-center px-6 pb-24">
        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px) saturate(120%)",
            WebkitBackdropFilter: "blur(12px) saturate(120%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 0 4px rgba(255,255,255,0.05)",
          }}
        >
          <div className="aspect-video w-full flex items-center justify-center">
            <span className="text-xs text-muted-foreground/40 uppercase tracking-widest">
              Video coming soon
            </span>
          </div>
        </div>
      </section>

      {/* About section */}
      <section id="about" className="relative z-10 flex justify-center px-6 pb-32">
        <div
          className="w-full max-w-2xl rounded-2xl p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px) saturate(120%)",
            WebkitBackdropFilter: "blur(12px) saturate(120%)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), inset 0 0 4px rgba(255,255,255,0.05)",
          }}
        >
          <h2
            className="text-xl font-bold mb-3 text-foreground"
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              textShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            About the Program
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            ulio.ai is the AI tool creators can't stop posting about. Our affiliate program gives you a
            direct way to monetize your audience by sharing something they'll genuinely love.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Commission", value: "30%" },
              { label: "Cookie Window", value: "60 days" },
              { label: "Payouts", value: "Monthly" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p
                  className="text-2xl font-bold text-primary"
                  style={{ textShadow: "0 0 16px hsla(271,76%,53%,0.4)" }}
                >
                  {item.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
