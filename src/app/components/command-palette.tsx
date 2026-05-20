import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpenCheck,
  Github,
  Home,
  Mail,
  MessageCircle,
  Moon,
  Search,
  Send,
  Sparkles,
  Sun,
  Grid3x3,
  User,
} from "lucide-react";
import { projects } from "./case-study";

export function CommandPalette({
  onNavigate,
}: {
  onNavigate: (slug: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openEvt = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-cmd", openEvt);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-cmd", openEvt);
    };
  }, []);

  const sections = useMemo(
    () => [
      { label: "Giới thiệu", href: "#profile", icon: <Home size={14} /> },
      { label: "Dự án", href: "#archive", icon: <Grid3x3 size={14} /> },
      { label: "Tổng kết", href: "#reflection", icon: <BookOpenCheck size={14} /> },
      { label: "Liên hệ", href: "#contact", icon: <MessageCircle size={14} /> },
    ],
    []
  );

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          hidden items-center gap-2 rounded-full border border-stone-900/15 bg-[#fbf5e8] px-3 py-1.5 font-mono text-xs text-stone-700 transition md:flex
          hover:border-[#e85d2c] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-[#ffb829]
        "
        aria-label="Open command palette"
      >
        <Search size={12} />
        <span className="uppercase tracking-widest">Tìm</span>
        <kbd className="ml-2 rounded bg-stone-900/10 px-1.5 py-0.5 text-[10px] dark:bg-white/10">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="
                w-full max-w-xl overflow-hidden rounded-[24px] border
                bg-[#fbf5e8] border-stone-900/20 shadow-[8px_8px_0_0_#1c140d]
                dark:bg-[#0f1320] dark:border-white/15 dark:shadow-2xl
              "
            >
              <Command label="Command Menu" className="w-full">
                <div className="flex items-center gap-3 border-b border-stone-900/10 px-4 py-3 dark:border-white/10">
                  <Search size={16} className="text-stone-500 dark:text-white/40" />
                  <Command.Input
                    placeholder="Gõ để tìm trang giới thiệu, bài nộp hoặc liên hệ..."
                    className="
                      flex-1 bg-transparent text-sm outline-none
                      placeholder:text-stone-400 dark:placeholder:text-white/30
                    "
                  />
                  <kbd className="rounded bg-stone-900/10 px-2 py-0.5 font-mono text-[10px] text-stone-600 dark:bg-white/10 dark:text-white/60">
                    ESC
                  </kbd>
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-8 text-center text-sm text-stone-500 dark:text-white/40">
                    Không thấy kết quả. Thử gõ "bài" hoặc "liên hệ".
                  </Command.Empty>

                  <Command.Group heading="Đi nhanh" className="cmd-group">
                    {sections.map((section) => (
                      <Item key={section.href} icon={section.icon} onSelect={() => go(section.href)}>
                        {section.label}
                      </Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Bài nộp" className="cmd-group">
                    {projects.map((project) => (
                      <Item
                        key={project.slug}
                        icon={<Sparkles size={14} />}
                        onSelect={() => {
                          setOpen(false);
                          onNavigate(project.slug);
                        }}
                      >
                        {project.week} — {project.title}
                      </Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Giao diện" className="cmd-group">
                    <Item icon={<Sun size={14} />} onSelect={toggleTheme}>
                      Bật chế độ sáng / tối
                    </Item>
                    <Item icon={<Moon size={14} />} onSelect={toggleTheme}>
                      Đổi giao diện
                    </Item>
                  </Command.Group>

                  <Command.Group heading="Liên kết" className="cmd-group">
                    <Item icon={<Mail size={14} />} onSelect={() => (location.href = "mailto:25112107@vnu.edu.vn")}>
                      Gửi email
                    </Item>
                    <Item icon={<Github size={14} />} onSelect={() => window.open("https://github.com/thanhnguyn", "_blank")}>
                      GitHub
                    </Item>
                    <Item icon={<Send size={14} />} onSelect={() => window.open("https://thanhnguyn.github.io", "_blank")}>
                      Trang gốc
                    </Item>
                  </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-stone-900/10 px-4 py-2 font-mono text-[10px] text-stone-500 dark:border-white/10 dark:text-white/40">
                  <span>↑↓ di chuyển · ↵ chọn</span>
                  <span>Nguyễn Tuấn Thành · 25112107</span>
                </div>
              </Command>
              <style>{`
                .cmd-group [cmdk-group-heading] {
                  padding: 8px 12px 4px;
                  font-family: 'JetBrains Mono', monospace;
                  font-size: 10px;
                  text-transform: uppercase;
                  letter-spacing: 0.15em;
                  color: rgba(120,113,108,0.8);
                }
                .dark .cmd-group [cmdk-group-heading] { color: rgba(255,255,255,0.4); }
              `}</style>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: ReactNode;
  icon: ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="
        flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm
        text-stone-800 aria-selected:bg-[#e85d2c] aria-selected:text-white
        dark:text-white/90 dark:aria-selected:bg-[#ffb829] dark:aria-selected:text-black
      "
    >
      <span className="opacity-70">{icon}</span>
      {children}
    </Command.Item>
  );
}
