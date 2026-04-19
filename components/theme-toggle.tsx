"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return compact ? (
      <div className="h-10 w-10 rounded-full border border-border/70" />
    ) : (
      <div className="h-10 w-20 rounded-full border border-border/70" />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="glass-panel relative flex h-10 w-10 items-center justify-center rounded-full"
        aria-label="Toggle theme"
      >
        <motion.span
          animate={{
            scale: isDark ? 1 : 0.72,
            opacity: 1,
            backgroundColor: isDark ? "rgb(var(--foreground))" : "rgb(var(--accent))",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="h-3.5 w-3.5 rounded-full"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass-panel relative flex h-10 w-20 items-center rounded-full px-1.5"
      aria-label="Toggle theme"
    >
      <motion.span
        animate={{ x: isDark ? 42 : 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="absolute left-[0.35rem] h-7 w-7 rounded-full bg-foreground"
      />
      <span className="relative z-10 flex w-full items-center justify-between px-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-background">
        <span>L</span>
        <span>D</span>
      </span>
    </button>
  );
}
