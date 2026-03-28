import type { Metadata } from "next";
import { Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Principles — khabri.ai",
  description: "The ethical principles guiding how khabri.ai uses artificial intelligence.",
};

const principles = [
  {
    number: "01",
    title: "Grounded in Evidence",
    body: "Our AI model is instructed never to invent information. It classifies claims solely based on retrieved news headlines from authoritative sources.",
  },
  {
    number: "02",
    title: "Explainability",
    body: "Every verdict comes with a plain-language explanation and links to supporting sources, so the reasoning is never hidden.",
  },
  {
    number: "03",
    title: "Calibrated Uncertainty",
    body: "When evidence is insufficient, we default to 'NOT VERIFIED' rather than guessing. Confidence scores communicate our certainty level.",
  },
  {
    number: "04",
    title: "No Political Bias",
    body: "We do not weight sources by political leaning. Our trusted source list is maintained on journalistic standards and editorial independence.",
  },
  {
    number: "05",
    title: "Human Oversight",
    body: "AI is a tool, not the final arbiter. We encourage users to read the cited articles and form their own informed judgment.",
  },
  {
    number: "06",
    title: "Continuous Improvement",
    body: "We actively monitor verdict quality and update our models and source lists as the information landscape evolves.",
  },
];

export default function AIPrinciplesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest">
          <Brain size={14} />
          AI Principles
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-tight">
          Responsible AI.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            By design.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          We believe AI should amplify human judgment, not override it. These are the principles we hold ourselves accountable to.
        </p>
      </div>

      <div className="space-y-6">
        {principles.map((p) => (
          <div key={p.number} className="flex gap-8 glass p-8 rounded-[2rem] border border-border group hover:border-brand-primary/30 transition-colors">
            <span className="text-5xl font-black text-brand-primary/20 font-mono leading-none shrink-0 group-hover:text-brand-primary/40 transition-colors">
              {p.number}
            </span>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-foreground tracking-tight">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
