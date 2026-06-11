import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function MagneticCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      const m = t.closest("[data-magnetic]") as HTMLElement | null;
      setHovering(!!m);
      setLabel(m?.dataset.cursor || null);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block"
    >
      <motion.div
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          backgroundColor: hovering ? "rgba(232,93,44,0.95)" : "transparent",
          borderColor: hovering ? "rgba(232,93,44,0)" : "rgba(232,93,44,0.9)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border-2 mix-blend-difference"
      >
        {label && (
          <span className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-widest text-white">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Magnetic({
  children,
  strength = 0.4,
  className,
  cursor,
  as: As = "div",
  ...rest
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  cursor?: string;
  as?: any;
  [k: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * strength);
      y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength, x, y]);

  return (
    <motion.div
      ref={ref as any}
      data-magnetic
      data-cursor={cursor}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
