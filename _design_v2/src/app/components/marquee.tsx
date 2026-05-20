import { motion } from "motion/react";
import { Asterisk } from "lucide-react";

export function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--accent)] py-4 text-black">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl italic md:text-5xl">
            {t}
            <Asterisk className="shrink-0" size={22} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
