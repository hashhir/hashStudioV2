"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.45 });
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX - 8);
      y.set(event.clientY - 8);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [x, y]);

  if (!desktop) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-4 w-4 rounded-full bg-accent mix-blend-difference lg:block"
      style={{ x: springX, y: springY }}
    />
  );
}
