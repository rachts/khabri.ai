"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const languages = [
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi", primary: true },
  { label: "Bengali", value: "bengali" },
];

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {languages.map((lang) => (
        <button
          key={lang.value}
          onClick={() => onChange(lang.value)}
          className={cn(
            "relative px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border",
            value === lang.value
              ? "bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105 z-10"
              : "bg-muted border-border text-muted-foreground hover:bg-card-foreground/5"
          )}
        >
          {value === lang.value && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-brand-primary rounded-2xl -z-10"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          {lang.label}
        </button>
      ))}
    </div>
  );
}
