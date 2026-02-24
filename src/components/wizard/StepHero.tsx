import TrustBar from "./TrustBar";
import HowItWorks from "./HowItWorks";
import TargetMarket from "./TargetMarket";

const StepHero = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
      <div className="mb-6 text-sm font-medium tracking-[0.2em] uppercase text-primary/70">
        ulio.ai affiliate program
      </div>
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6">
        Partner with{" "}
        <span className="text-primary">ulio.ai</span>
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mb-12 leading-relaxed">
        Join our exclusive network of creators and earn while sharing tools your audience will love.
      </p>
      <button onClick={onStart} className="glow-button text-lg px-10 py-5 rounded-2xl">
        Start Application
      </button>

      <TrustBar />
      <HowItWorks />
      <TargetMarket />
    </div>
  );
};

export default StepHero;
