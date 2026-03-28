import type { Metadata } from "next";
import { ShieldCheck, Eye, AlertTriangle, Lock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Trust & Safety — khabri.ai",
  description: "How khabri.ai ensures the safety of its users and the trustworthiness of its information.",
};

const pillars = [
  {
    icon: ShieldCheck,
    title: "Evidence-Based Verdicts",
    body: "Every fact-check is grounded in real, timestamped articles from trusted publishers. We never generate verdicts from AI alone.",
  },
  {
    icon: Eye,
    title: "Source Transparency",
    body: "Every verdict links back to the original news sources so you can read for yourself. No black-box decisions.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    body: "We do not store the claims you submit. Each verification request is processed in real-time and discarded immediately.",
  },
  {
    icon: AlertTriangle,
    title: "Limitation Disclosure",
    body: "Our system can miss context. We clearly display confidence scores and encourage critical reading alongside our results.",
  },
  {
    icon: Users,
    title: "Inclusive Design",
    body: "khabri.ai supports vernacular languages including Hindi and Bengali, ensuring fact-checking is accessible across India.",
  },
];

export default function TrustSafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      {/* Hero */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest">
          <ShieldCheck size={14} />
          Trust &amp; Safety
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-tight">
          Built on evidence.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            Not assumption.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          khabri.ai is designed to complement critical thinking — not replace it. Here is how we protect the integrity of information and the privacy of our users.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((p, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border border-border space-y-4">
            <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary w-fit">
              <p.icon size={24} />
            </div>
            <h2 className="text-xl font-black text-foreground tracking-tight">{p.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="glass p-10 rounded-[2rem] border border-border text-center space-y-4">
        <h2 className="text-2xl font-black text-foreground">Report a concern</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          If you believe a verdict is incorrect or you have found a safety issue, please contact our team at{" "}
          <a href="mailto:safety@khabri.ai" className="text-brand-primary font-bold hover:underline">
            safety@khabri.ai
          </a>
          .
        </p>
      </div>
    </div>
  );
}
