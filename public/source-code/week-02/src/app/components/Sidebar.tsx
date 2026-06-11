import { useEffect, useState } from "react";

export interface Section {
  id: string;
  roman: string;
  label: string;
}

export const SECTIONS: Section[] = [
  { id: "hero", roman: "00", label: "OBSERVATORY" },
  { id: "intro", roman: "I", label: "MỞ ĐẦU" },
  { id: "method", roman: "II", label: "PHƯƠNG PHÁP" },
  { id: "sources", roman: "III", label: "ĐÁNH GIÁ NGUỒN" },
  { id: "analysis", roman: "IV", label: "PHÂN TÍCH" },
  { id: "conclusion", roman: "V", label: "KẾT LUẬN" },
  { id: "references", roman: "VI", label: "THAM KHẢO" },
];

export function Sidebar() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
      let cur = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 200) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col"
      style={{
        width: 88,
        background: "#0A0A0A",
        borderRight: "1px solid #1A1A1A",
        zIndex: 50,
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{ padding: "24px 0", borderBottom: "1px solid #1A1A1A" }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "1.5px solid #E8701A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 700,
            color: "#E8701A",
            fontSize: 14,
          }}
        >
          Δ
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 8,
            color: "#6B6B6B",
            marginTop: 8,
            letterSpacing: 1.5,
          }}
        >
          DAG-OBS
        </div>
      </div>

      <nav className="flex-1 flex flex-col items-center justify-center gap-6">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-2 transition-colors"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                letterSpacing: 2,
                color: isActive ? "#E8701A" : "#5A5A5A",
                textDecoration: "none",
              }}
            >
              <span style={{ opacity: 0.6 }}>{s.roman}</span>
              <span>{s.label}</span>
              {isActive && (
                <span
                  style={{
                    width: 2,
                    height: 24,
                    background: "#E8701A",
                  }}
                />
              )}
            </a>
          );
        })}
      </nav>

      <div
        style={{ padding: 16, borderTop: "1px solid #1A1A1A" }}
        className="flex flex-col items-center gap-2"
      >
        <div
          style={{
            width: 4,
            height: 120,
            background: "#1A1A1A",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: `${progress * 100}%`,
              background: "#E8701A",
              transition: "height 0.1s",
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9,
            color: "#6B6B6B",
          }}
        >
          {String(Math.round(progress * 100)).padStart(2, "0")}%
        </div>
      </div>
    </aside>
  );
}
