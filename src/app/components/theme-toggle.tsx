import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        group relative h-10 w-[72px] rounded-full transition-all
        border border-stone-900/25 bg-[#FBF5E8] shadow-[3px_3px_0_0_#1c140d] hover:shadow-[1px_1px_0_0_#1c140d] hover:translate-x-[2px] hover:translate-y-[2px]
        dark:border-white/15 dark:bg-white/5 dark:shadow-none dark:backdrop-blur dark:hover:translate-x-0 dark:hover:translate-y-0 dark:hover:border-[#FFB829]
      "
      aria-label="Toggle theme"
    >
      <span
        className="
          absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-500
          bg-[#E85D2C] text-white
          dark:bg-[#FFB829] dark:text-black
        "
        style={{ transform: dark ? "translateX(32px)" : "translateX(0)" }}
      >
        {dark ? <Moon size={16} strokeWidth={2.4} /> : <Sun size={16} strokeWidth={2.4} />}
      </span>
    </button>
  );
}
