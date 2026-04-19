"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function EntryLoader() {
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 1;

    const interval = window.setInterval(() => {
      current += 1;
      setCount(current);

      if (current >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => setVisible(false), 260);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.75, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.span
            key={count}
            initial={{ opacity: 0.5, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="font-display text-[28vw] font-extrabold leading-none tracking-[-0.08em] text-foreground/95 sm:text-[20vw]"
          >
            {String(count).padStart(2, "0")}
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
