import type { Metadata } from "next";
import { BarChart3, Rss, Database, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Transparency — khabri.ai",
  description: "How khabri.ai works under the hood — our data sources, methods, and limitations.",
};

const stack = [
  {
    icon: Rss,
    title: "Data Source",
    value: "Google News RSS",
    detail: "We query Google News RSS feeds in real-time for every verification request. No pre-cached or stale data.",
  },
  {
    icon: Database,
    title: "Trusted Publishers",
    value: "BBC, NDTV, The Hindu, Indian Express, Times of India",
    detail: "Our verified source list is restricted to organisations with established editorial standards.",
  },
  {
    icon: BarChart3,
    title: "Classification Method",
    value: "Evidence-Weighted Heuristics",
    detail: "Claims are classified based on the headline content of retrieved articles. Keyword matching drives confidence scores.",
  },
  {
    icon: Code2,
    title: "Open Stack",
    value: "Next.js · TypeScript · Tailwind · Framer Motion",
    detail: "khabri.ai is built on open-source technologies. We aim to open-source the core classification logic in future.",
  },
];

export default function TransparencyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest">
          <BarChart3 size={14} />
          Transparency
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-tight">
          No black boxes.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            Full visibility.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          We believe in radical transparency about how our system works, where data comes from, and how decisions are made.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stack.map((item, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border border-border space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-brand-primary/10 text-brand-primary">
                <item.icon size={22} />
              </div>
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{item.title}</span>
            </div>
            <p className="text-lg font-black text-foreground">{item.value}</p>
            <p className="text-muted-foreground leading-relaxed text-sm">{item.detail}</p>
          </div>
        ))}
      </div>

      <div className="glass p-10 rounded-[2rem] border border-border space-y-4">
        <h2 className="text-2xl font-black text-foreground">Known Limitations</h2>
        <ul className="space-y-3 text-muted-foreground list-disc list-inside leading-relaxed">
          <li>Breaking news may not yet be indexed in the RSS feed — verdicts could be delayed.</li>
          <li>Hyperlocal or regional stories may not have coverage from our listed publishers.</li>
          <li>Satire and parody content may occasionally be misclassified.</li>
          <li>Long-form claims with multiple sub-claims are simplified to a single verdict.</li>
        </ul>
      </div>
    </div>
  );
}
