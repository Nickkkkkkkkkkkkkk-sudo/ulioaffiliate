const Index = () => {
  return (
    <main className="relative min-h-screen bg-background flex items-center justify-center px-6">
      <h1
        className="text-4xl sm:text-6xl lg:text-7xl font-bold text-center leading-tight max-w-4xl"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          textShadow: "0 0 30px rgba(255,255,255,0.15), 0 0 60px rgba(255,255,255,0.05)",
        }}
      >
        The Most{" "}
        <span
          className="text-primary"
          style={{ textShadow: "0 0 20px hsla(271,76%,53%,0.5), 0 0 40px hsla(271,76%,53%,0.25)" }}
        >
          "Post-able"
        </span>{" "}
        AI Tool of 2026 is Now{" "}
        <span
          className="text-primary"
          style={{ textShadow: "0 0 20px hsla(271,76%,53%,0.5), 0 0 40px hsla(271,76%,53%,0.25)" }}
        >
          Paying Affiliates
        </span>
      </h1>
    </main>
  );
};

export default Index;
