import { useEffect, useRef, useState } from "react";
import { FileText, Film, Image, Presentation, FileVideo, Mic } from "lucide-react";

const DOCUMENTS = [
  { name: "Ulio Receptionist Demo.mp4", icon: Film, accent: "hsl(271 76% 60%)" },
  { name: "AI Call Handling Walkthrough.mp4", icon: FileVideo, accent: "hsl(280 70% 55%)" },
  { name: "Instagram Reel – Missed Calls.mov", icon: Film, accent: "hsl(260 70% 58%)" },
  { name: "TikTok Hook Script.docx", icon: FileText, accent: "hsl(271 76% 60%)" },
  { name: "Ulio Feature Breakdown.pptx", icon: Presentation, accent: "hsl(285 65% 55%)" },
  { name: "Before & After Comparison.png", icon: Image, accent: "hsl(265 72% 58%)" },
  { name: "Client Testimonial – Salon.mp4", icon: Film, accent: "hsl(275 70% 56%)" },
  { name: "YouTube Review Template.docx", icon: FileText, accent: "hsl(271 76% 60%)" },
  { name: "Ulio ROI Calculator.xlsx", icon: FileText, accent: "hsl(140 60% 45%)" },
  { name: "Podcast Talking Points.pdf", icon: Mic, accent: "hsl(290 60% 55%)" },
  { name: "Screen Recording – Setup.mp4", icon: FileVideo, accent: "hsl(271 76% 60%)" },
  { name: "Story Templates Pack.zip", icon: Image, accent: "hsl(260 65% 58%)" },
  { name: "Affiliate Link Guide.pdf", icon: FileText, accent: "hsl(0 65% 55%)" },
  { name: "Carousel Post – 5 Reasons.psd", icon: Image, accent: "hsl(280 70% 55%)" },
  { name: "Client Testimonial – Gym.mp4", icon: Film, accent: "hsl(275 70% 56%)" },
  { name: "Ulio vs Competitors.docx", icon: FileText, accent: "hsl(271 76% 60%)" },
  { name: "Email Swipe File.txt", icon: FileText, accent: "hsl(200 60% 50%)" },
  { name: "Webinar Recording.mp4", icon: Film, accent: "hsl(285 65% 55%)" },
];

// Duplicate for seamless loop
const LOOPED_DOCS = [...DOCUMENTS, ...DOCUMENTS];

const ContentVault = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 flex flex-col items-center px-6 pb-32 pt-8"
    >
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary/50 mb-3">
        Content Library
      </p>
      <h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-2xl mb-4"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          textShadow:
            "0 0 30px rgba(255,255,255,0.15), 0 0 6px rgba(255,255,255,0.3)",
        }}
      >
        Ready-Made Content.{" "}
        <span
          className="text-primary"
          style={{
            textShadow:
              "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3)",
          }}
        >
          Your Voice.
        </span>
      </h2>
      <p className="text-sm text-muted-foreground max-w-md text-center leading-relaxed mb-12">
        Get instant access to screen recordings, scripts, templates, and assets — remix them, add your personality, and post.
      </p>

      {/* macOS-style Finder window */}
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          background: "hsla(271, 20%, 8%, 0.85)",
          backdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid hsla(0, 0%, 100%, 0.1)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.6), 0 0 40px hsla(271, 76%, 53%, 0.08), inset 0 1px 0 hsla(0, 0%, 100%, 0.06)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "hsla(271, 20%, 12%, 0.9)",
            borderBottom: "1px solid hsla(0, 0%, 100%, 0.06)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(0 70% 55%)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(45 80% 55%)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "hsl(130 55% 45%)" }} />
          </div>
          <div className="flex-1 text-center">
            <span
              className="text-xs font-medium text-muted-foreground"
              style={{ letterSpacing: "0.02em" }}
            >
              Ulio Affiliate Content
            </span>
          </div>
          <div className="w-[52px]" /> {/* Balance the traffic lights */}
        </div>

        {/* Column headers */}
        <div
          className="grid px-4 py-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50"
          style={{
            gridTemplateColumns: "1fr 100px 80px",
            borderBottom: "1px solid hsla(0, 0%, 100%, 0.04)",
          }}
        >
          <span>Name</span>
          <span>Kind</span>
          <span className="text-right">Size</span>
        </div>

        {/* Scrolling file list */}
        <div className="relative overflow-hidden" style={{ height: 340 }}>
          {/* Fade masks */}
          <div
            className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: 40,
              background: "linear-gradient(to bottom, hsla(271, 20%, 8%, 0.95), transparent)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
            style={{
              height: 40,
              background: "linear-gradient(to top, hsla(271, 20%, 8%, 0.95), transparent)",
            }}
          />

          <div
            className={inView ? "animate-scroll-files" : ""}
            style={{ willChange: "transform" }}
          >
            {LOOPED_DOCS.map((doc, i) => {
              const Icon = doc.icon;
              const ext = doc.name.split(".").pop()?.toUpperCase() ?? "";
              const sizeKB = ((i * 1337 + 420) % 48000 + 800).toLocaleString();
              const kind =
                ext === "MP4" || ext === "MOV"
                  ? "Movie"
                  : ext === "DOCX" || ext === "TXT" || ext === "PDF"
                  ? "Document"
                  : ext === "PPTX"
                  ? "Presentation"
                  : ext === "PNG" || ext === "PSD"
                  ? "Image"
                  : ext === "XLSX"
                  ? "Spreadsheet"
                  : "Archive";

              return (
                <div
                  key={`${doc.name}-${i}`}
                  className="grid items-center px-4 py-2.5 transition-colors hover:bg-white/[0.03]"
                  style={{
                    gridTemplateColumns: "1fr 100px 80px",
                    borderBottom: "1px solid hsla(0, 0%, 100%, 0.03)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      size={16}
                      style={{ color: doc.accent, flexShrink: 0 }}
                    />
                    <span className="text-sm text-foreground/90 truncate">
                      {doc.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground/60">{kind}</span>
                  <span className="text-xs text-muted-foreground/60 text-right">
                    {sizeKB} KB
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-end px-4 py-2"
          style={{
            background: "hsla(271, 20%, 12%, 0.6)",
            borderTop: "1px solid hsla(0, 0%, 100%, 0.06)",
          }}
        >
          <span className="text-[10px] text-muted-foreground/50">
            Updated today
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContentVault;
