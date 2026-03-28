import Navbar from "@/components/Navbar";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "khabri.ai",
};

const footerLinks = [
  { href: "/trust-safety", label: "Trust & Safety" },
  { href: "/ai-principles", label: "AI Principles" },
  { href: "/transparency", label: "Transparency" },
  { href: "/newsroom", label: "Newsroom" },
  { href: "https://github.com", label: "GitHub", external: true },
];

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">{children}</main>
      <footer className="border-t border-border py-16 px-6 bg-card mt-24">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-lg" />
            <span className="text-2xl font-black text-foreground tracking-tighter">khabri.ai</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.map((l) =>
              l.external ? (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-primary text-xs font-black uppercase tracking-widest transition-colors">
                  {l.label}
                </a>
              ) : (
                <Link key={l.href} href={l.href}
                  className="text-muted-foreground hover:text-brand-primary text-xs font-black uppercase tracking-widest transition-colors">
                  {l.label}
                </Link>
              )
            )}
          </div>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 KHABRI.AI LABS
          </p>
        </div>
      </footer>
    </div>
  );
}
