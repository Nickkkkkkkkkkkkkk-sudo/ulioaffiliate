import HowItWorks from "./HowItWorks";

const StepHero = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <div className="mb-4 text-sm font-medium tracking-widest uppercase text-primary/70">
        ulio.ai affiliate program
      </div>
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.08] mb-4">
        Partner with{" "}
        <span className="text-primary" style={{ textShadow: "0 0 10px hsla(271, 76%, 53%, 0.15), 0 0 20px hsla(271, 76%, 53%, 0.08)" }}>ulio.ai</span>
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
        Join our exclusive network of creators and earn while sharing tools your audience will love.
      </p>
      <button onClick={onStart} className="glow-button text-base px-8 py-4 rounded-2xl">
        Start Application
      </button>

      <HowItWorks />
    </div>
  );
};

export default StepHero;
