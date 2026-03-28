"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent shadow-lg shadow-brand-primary/20" />
          <span className="text-xl font-black text-foreground tracking-tighter">khabri.ai</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b border-border/50 transition-colors">
      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform flex items-center justify-center font-black text-xs text-white">k.</div>
        <span className="text-xl font-black text-foreground tracking-tighter">ai</span>
      </div>

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}
