import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "How much can I actually earn?",
    a: "We offer a 17% recurring commission for every active subscriber you refer. Because ulio.ai becomes a core part of a business's operations, our retention is incredibly high. You don't just get paid once; you build a monthly paycheck that grows every time you post.",
  },
  {
    q: "I'm not a tech expert. Can I still promote this?",
    a: "Absolutely. You don't need to know how to code or build AI. Our Affiliate Content Library gives you raw screen recordings of the product in action, showing the AI being built and booking real appointments. Just add your own touch (voiceover, reaction, or captions), share your link, and let the software sell itself.",
  },
  {
    q: "When and how do I get paid?",
    a: "We don't make you wait months for your money. You are eligible for payouts as soon as your sales are processed. We support instant-access payouts through Stripe and PayPal, so your hard work turns into cash in your account right away.",
  },
  {
    q: "Can I use your videos for my TikTok/Reels/X posts?",
    a: "Yes! We encourage it. In your partner portal, you'll find a Creator Kit with raw b-roll and screen recordings of the AI receptionist interface. We only ask that you remix them and add your own unique voice or face-cam to ensure the social media algorithms push your content to the widest possible audience.",
  },
  {
    q: "Why is ulio.ai easier to sell than other AI tools?",
    a: "Most AI tools are nice-to-haves, but ulio.ai solves a painful, expensive problem: missed calls. Every missed call is a missed customer. When you show a business owner that they can have a 24/7 receptionist for a fraction of the cost of a human staff member, the software practically sells itself.",
  },
];

const FAQ = () => {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pb-32 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary/50 mb-3">
        FAQ
      </p>
      <h2
        className="text-xl sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-2xl mb-12"
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          textShadow:
            "0 0 30px rgba(255,255,255,0.15), 0 0 6px rgba(255,255,255,0.3)",
        }}
      >
        Frequently Asked{" "}
        <span
          className="text-primary"
          style={{
            textShadow:
              "0 0 24px hsla(271,76%,53%,0.6), 0 0 48px hsla(271,76%,53%,0.3)",
          }}
        >
          Questions
        </span>
      </h2>

      <div className="w-full max-w-2xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border-0 px-5 py-1"
              style={{
                background: "hsla(271, 20%, 10%, 0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid hsla(0, 0%, 100%, 0.07)",
              }}
            >
              <AccordionTrigger className="text-sm sm:text-base font-medium text-foreground/90 hover:no-underline hover:text-primary transition-colors py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* Footer */}
      <footer
        className="w-full max-w-2xl mt-24 pt-8 flex flex-col items-center gap-4"
        style={{ borderTop: "1px solid hsla(0, 0%, 100%, 0.06)" }}
      >
        <span
          className="text-sm font-bold tracking-tight text-foreground/70"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          ulio<span className="text-primary">.ai</span>
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted-foreground/40 uppercase tracking-widest">
          <span>Privacy Policy</span>
          <span className="hidden sm:inline">·</span>
          <span>Terms of Service</span>
          <span className="hidden sm:inline">·</span>
          <span>Affiliate Agreement</span>
        </div>
        <p className="text-[11px] text-muted-foreground/30 text-center leading-relaxed max-w-md">
          © {new Date().getFullYear()} Ulio Technologies, Inc. All rights reserved. Ulio, the Ulio logo, and ulio.ai are trademarks of Ulio Technologies, Inc. Commission rates are subject to the terms outlined in the Affiliate Partner Agreement.
        </p>
      </footer>
    </section>
};

export default FAQ;
