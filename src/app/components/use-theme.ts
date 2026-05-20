import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function getDocumentTheme() {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useThemeMode() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? resolvedTheme ?? theme : getDocumentTheme();
  const isDark = activeTheme === "dark";

  return {
    isDark,
    toggleTheme: () => setTheme(isDark ? "light" : "dark"),
  };
}

export function useIsDark() {
  return useThemeMode().isDark;
}
