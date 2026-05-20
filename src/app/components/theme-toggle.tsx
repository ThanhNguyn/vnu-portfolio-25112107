import { Moon, Sun } from "lucide-react";
import { useThemeMode } from "./use-theme";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <button
      onClick={toggleTheme}
      className="
        group relative h-10 w-[72px] rounded-full transition-all duration-300 ease-out
        border border-stone-900/25 bg-[#FBF5E8] shadow-[3px_3px_0_0_#1c140d] hover:shadow-[1px_1px_0_0_#1c140d] hover:translate-x-[2px] hover:translate-y-[2px]
        dark:border-white/15 dark:bg-white/5 dark:shadow-[3px_3px_0_0_#FFB829] dark:backdrop-blur dark:hover:translate-x-[2px] dark:hover:translate-y-[2px] dark:hover:border-[#FFB829] dark:hover:shadow-[1px_1px_0_0_#FFB829]
      "
      aria-label="Toggle theme"
    >
      <span
        className="
          absolute top-1 left-1 flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 ease-out will-change-transform
          bg-[#E85D2C] text-white
          dark:bg-[#FFB829] dark:text-black
        "
        style={{ transform: isDark ? "translateX(32px)" : "translateX(0)" }}
      >
        {isDark ? <Moon size={16} strokeWidth={2.4} /> : <Sun size={16} strokeWidth={2.4} />}
      </span>
    </button>
  );
}
