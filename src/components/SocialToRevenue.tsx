import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const VIDEOS = [
  { id: 1, hue: 271, src: "/videos/clip-2.mp4" },
  { id: 2, hue: 290, src: "/videos/clip-3.mp4" },
  { id: 3, hue: 260, src: "/videos/clip-4.mp4" },
  { id: 4, hue: 280, src: "/videos/clip-5.mp4" },
  { id: 5, hue: 265, src: "/videos/clip-6.mp4" },
  { id: 6, hue: 255, src: "/videos/clip-7.mp4" },
  { id: 7, hue: 285, src: "/videos/clip-8.mp4" },
  { id: 8, hue: 270, src: "/videos/clip-9.mp4" },
  { id: 9, hue: 278, src: "/videos/clip-10.mp4" },
  { id: 10, hue: 275, src: "/videos/clip-1.mp4" }, // top of stack
];

// Desktop: spread out horizontally
const SCATTERED_DESKTOP = [
  { x: -440, y: -140, rotate: -12, scale: 0.86 },
  { x: -180, y: -160, rotate: 6, scale: 0.88 },
  { x: 120, y: -150, rotate: -8, scale: 0.87 },
  { x: 420, y: -130, rotate: 14, scale: 0.85 },
  { x: -360, y: 120, rotate: -6, scale: 0.87 },
  { x: -100, y: 140, rotate: 10, scale: 0.86 },
  { x: 200, y: 130, rotate: -5, scale: 0.88 },
  { x: 460, y: 110, rotate: 8, scale: 0.85 },
  { x: -260, y: -10, rotate: -3, scale: 0.89 },
  { x: 340, y: -10, rotate: 4, scale: 0.87 },
];

// Mobile: vertical layout, 2 columns fitting within ~360px wide, ~600px tall
const SCATTERED_MOBILE = [
  { x: -80, y: -250, rotate: -10, scale: 0.82 },
  { x: 80, y: -240, rotate: 8, scale: 0.84 },
  { x: -90, y: -110, rotate: 5, scale: 0.83 },
  { x: 85, y: -100, rotate: -7, scale: 0.82 },
  { x: -75, y: 20, rotate: -4, scale: 0.84 },
  { x: 90, y: 30, rotate: 6, scale: 0.83 },
  { x: -85, y: 150, rotate: 8, scale: 0.82 },
  { x: 80, y: 160, rotate: -5, scale: 0.84 },
  { x: -70, y: 280, rotate: -6, scale: 0.83 },
  { x: 85, y: 290, rotate: 4, scale: 0.82 },
];

// Stacked like a fanned deck — each card offset so edges are visible
const STACKED = [
  { x: -18, y: 36, rotate: -5, scale: 0.86 },
  { x: -15, y: 32, rotate: -4, scale: 0.88 },
  { x: -12, y: 28, rotate: -3, scale: 0.90 },
  { x: -9, y: 24, rotate: -2, scale: 0.92 },
  { x: -6, y: 20, rotate: -1.2, scale: 0.93 },
  { x: -3, y: 16, rotate: -0.5, scale: 0.94 },
  { x: 0, y: 12, rotate: 0.3, scale: 0.96 },
  { x: 3, y: 8, rotate: 0.8, scale: 0.97 },
  { x: 5, y: 4, rotate: 1.2, scale: 0.98 },
  { x: 0, y: 0, rotate: 0, scale: 1 },
];

const FLOAT_OFFSETS = [
  { dx: 10, dy: -8, dr: 2.5 },
  { dx: -8, dy: 10, dr: -3.5 },
  { dx: 12, dy: 6, dr: 2 },
  { dx: -10, dy: -12, dr: -2.5 },
  { dx: 7, dy: 9, dr: 3.5 },
  { dx: -12, dy: -7, dr: -1.5 },
  { dx: 9, dy: -10, dr: 3 },
  { dx: -7, dy: 8, dr: -2 },
  { dx: 11, dy: -6, dr: 1.5 },
  { dx: -9, dy: 11, dr: -3 },
];

const TARGET_VIEWS = 527_400;
const COUNTER_DURATION = 3000;
const REVENUE = "$20,000/mo";

type Phase = "scattered" | "stacking" | "counting" | "formula" | "hold" | "unstacking";

const SocialToRevenue = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [phase, setPhase] = useState<Phase>("scattered");
  const [count, setCount] = useState(0);
  const [floatTime, setFloatTime] = useState(0);
  const animFrameRef = useRef<number>(0);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [inView]);

  // Floating animation
  useEffect(() => {
    let running = true;
    const tick = () => {
      if (!running) return;
      setFloatTime(Date.now() / 1000);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutRefs.current.push(id);
    return id;
  }, []);

  // Animation sequence
  useEffect(() => {
    if (!inView) return;

    const startSequence = () => {
      clearTimeouts();
      setCount(0);

      // Phase: stacking
      addTimeout(() => {
        setPhase("stacking");

        addTimeout(() => {
          setPhase("counting");
          const startTime = Date.now();
          const countUp = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / COUNTER_DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * TARGET_VIEWS));
            if (progress < 1) {
              requestAnimationFrame(countUp);
            } else {
              setCount(TARGET_VIEWS);
              addTimeout(() => {
                setPhase("formula");
                addTimeout(() => {
                  setPhase("hold");
                  addTimeout(() => {
                    // Smooth unstack back to scattered
                    setPhase("unstacking");
                    addTimeout(() => {
                      setPhase("scattered");
                      setCount(0);
                      // Float for a bit then restart
                      addTimeout(() => startSequence(), 3000);
                    }, 1400);
                  }, 4000);
                }, 500);
              }, 600);
            }
          };
          requestAnimationFrame(countUp);
        }, 1400);
      }, 3500);
    };

    setPhase("scattered");
    addTimeout(() => startSequence(), 100);
    return clearTimeouts;
  }, [inView, clearTimeouts, addTimeout]);

  const formatViews = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toString();
  };

  const isScattered = phase === "scattered" || phase === "unstacking";
  const showCounter = phase === "counting" || phase === "formula" || phase === "hold";
  const showFormula = phase === "formula" || phase === "hold";
  const isUnstacking = phase === "unstacking";

  const isMobile = useIsMobile();
  const CARD_W = isMobile ? 90 : 160;
  const CARD_H = isMobile ? 160 : 284;
  const SCALE_FACTOR = isMobile ? 0.55 : 1;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-col items-center px-6 pb-32 pt-16 overflow-hidden"
    >
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary/50 mb-3">
        Social to Revenue
      </p>
      <h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-2xl mb-16"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          textShadow: "0 0 30px rgba(255,255,255,0.15), 0 0 6px rgba(255,255,255,0.3)",
        }}
      >
        Your Content Becomes{" "}
        <span
          className="text-primary"
          style={{
            textShadow: "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3)",
          }}
        >
          Recurring Revenue
        </span>
      </h2>

      {/* Animation stage */}
      <div className="relative w-full max-w-5xl mx-auto" style={{ height: 480 }}>
        {/* Cards with playing videos */}
        <div className="absolute inset-0 flex items-center justify-center">
          {VIDEOS.map((video, i) => {
            const scattered = SCATTERED[i];
            const stacked = STACKED[i];
            const float = FLOAT_OFFSETS[i];

            const floatX = isScattered ? Math.sin(floatTime * 0.6 + i * 1.2) * float.dx : 0;
            const floatY = isScattered ? Math.cos(floatTime * 0.45 + i * 0.9) * float.dy : 0;
            const floatR = isScattered ? Math.sin(floatTime * 0.35 + i * 1.5) * float.dr : 0;

            const pos = isScattered ? scattered : stacked;
            // Scale down scattered positions on mobile
            const x = isScattered ? (pos.x * SCALE_FACTOR) + floatX : pos.x + floatX;
            const y = isScattered ? (pos.y * SCALE_FACTOR) + floatY : pos.y + floatY;
            const rotate = pos.rotate + floatR;
            const scale = pos.scale;

            return (
              <div
                key={video.id}
                className="absolute rounded-xl overflow-hidden"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scale})`,
                  transition: isScattered && !isUnstacking
                    ? "none"
                    : isUnstacking
                    ? "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  zIndex: i + 1,
                  background: `linear-gradient(135deg, hsl(${video.hue} 60% 15%), hsl(${video.hue} 80% 8%))`,
                  border: "1px solid hsla(271, 76%, 53%, 0.25)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px hsla(${video.hue}, 76%, 53%, 0.1)`,
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{ pointerEvents: "none" }}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                {/* Subtle overlay gradient for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Counter + Formula — positioned to the LEFT and RIGHT of the stack */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          {/* Views counter — left side */}
          <div
            className="absolute"
            style={{
              right: `calc(50% + ${CARD_W / 2 + 40}px)`,
              opacity: showCounter ? 1 : 0,
              transform: showCounter ? "translateX(0) scale(1)" : "translateX(20px) scale(0.9)",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="glass-panel px-5 py-3 sm:px-6 sm:py-4 flex flex-col items-center gap-1"
              style={{
                boxShadow: "0 0 40px hsla(271, 76%, 53%, 0.2), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Total Views
              </span>
              <span
                className="text-2xl sm:text-3xl font-bold tracking-tight text-primary tabular-nums"
                style={{ textShadow: "0 0 20px hsla(271,76%,53%,0.5)" }}
              >
                {formatViews(count)}
              </span>
            </div>
          </div>

          {/* Equals sign — center-right */}
          <div
            className="absolute"
            style={{
              left: `calc(50% + ${CARD_W / 2 + 40}px)`,
              opacity: showFormula ? 1 : 0,
              transform: showFormula ? "translateX(0)" : "translateX(-20px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
            }}
          >
            <div className="flex items-center gap-4">
              <span
                className="text-3xl sm:text-4xl font-bold text-primary"
                style={{
                  textShadow: "0 0 20px hsla(271,76%,53%,0.6)",
                }}
              >
                =
              </span>

              <div
                className="glass-panel px-5 py-3 sm:px-6 sm:py-4 flex flex-col items-center gap-1"
                style={{
                  opacity: showFormula ? 1 : 0,
                  transform: showFormula ? "translateX(0) scale(1)" : "translateX(-30px) scale(0.9)",
                  transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s",
                  boxShadow: showFormula
                    ? "0 0 60px hsla(271, 76%, 53%, 0.3), 0 0 120px hsla(271, 76%, 53%, 0.1), 0 8px 32px rgba(0,0,0,0.4)"
                    : "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Recurring
                </span>
                <span
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
                  style={{ textShadow: "0 0 30px rgba(255,255,255,0.3), 0 0 8px rgba(255,255,255,0.5)" }}
                >
                  {REVENUE}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialToRevenue;
