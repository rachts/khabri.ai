import type { Metadata } from "next";
import { Newspaper, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsroom — khabri.ai",
  description: "Latest updates, press releases, and media resources from khabri.ai.",
};

const releases = [
  {
    date: "March 2026",
    tag: "Launch",
    title: "khabri.ai Launches Beta: Vernacular Fact-Checking for India",
    body: "khabri.ai enters public beta with support for Hindi, Bengali, and English, offering real-time fact-checking powered by Google News RSS and evidence-based AI classification.",
  },
  {
    date: "March 2026",
    tag: "Product",
    title: "Real-Time Google News RSS Integration Goes Live",
    body: "The latest news section on khabri.ai now fetches live articles directly from Google News RSS, ensuring users always see current, relevant Indian news headlines.",
  },
  {
    date: "March 2026",
    tag: "Design",
    title: "Dark & Light Mode Support Added Across the Platform",
    body: "khabri.ai now ships with a professional dark and light mode toggle, delivering a premium experience optimised for all ambient lighting conditions.",
  },
];

export default function NewsroomPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-primary/30 text-brand-primary text-xs font-black uppercase tracking-widest">
          <Newspaper size={14} />
          Newsroom
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-tight">
          What&apos;s happening<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
            at khabri.ai
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Press releases, product updates, and milestones from the khabri.ai team.
        </p>
      </div>

      <div className="space-y-8">
        {releases.map((r, i) => (
          <article key={i} className="glass p-8 rounded-[2rem] border border-border space-y-4 hover:border-brand-primary/30 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{r.date}</span>
              <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-black uppercase tracking-tighter">
                {r.tag}
              </span>
            </div>
            <h2 className="text-xl font-black text-foreground leading-snug">{r.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{r.body}</p>
          </article>
        ))}
      </div>

      <div className="glass p-10 rounded-[2rem] border border-border flex flex-col md:flex-row items-center gap-8">
        <div className="p-4 rounded-2xl bg-brand-primary/10 text-brand-primary">
          <Mail size={28} />
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground">Press &amp; Media Enquiries</h2>
          <p className="text-muted-foreground mt-1">
            For press kits, interviews, or media partnerships, email us at{" "}
            <a href="mailto:press@khabri.ai" className="text-brand-primary font-bold hover:underline">
              press@khabri.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
