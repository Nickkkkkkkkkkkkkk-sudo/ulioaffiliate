import { Calendar, Mail, CreditCard, Zap } from "lucide-react";

const brands = [
  { label: "Google Calendar", icon: Calendar, hoverColor: "text-blue-500" },
  { label: "Outlook", icon: Mail, hoverColor: "text-sky-600" },
  { label: "Stripe", icon: CreditCard, hoverColor: "text-violet-500" },
  { label: "Zapier", icon: Zap, hoverColor: "text-orange-500" },
];

const TrustBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-20 mb-8">
      <p className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-8">
        Seamless ecosystem integration
      </p>
      <div className="flex items-center justify-center gap-10 sm:gap-16">
        {brands.map((brand) => (
          <div key={brand.label} className="brand-logo group">
            <div className="logo-icon flex h-12 w-12 items-center justify-center rounded-xl bg-muted/40">
              <brand.icon className={`h-6 w-6 text-muted-foreground transition-colors duration-500 group-hover:${brand.hoverColor}`} />
            </div>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/40 transition-colors duration-500 group-hover:text-foreground">
              {brand.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
