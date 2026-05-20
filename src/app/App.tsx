import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  BookOpenCheck,
  Github,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Grid3x3,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "./components/media/ImageWithFallback";
import { ThemeToggle } from "./components/theme-toggle";
import { Grain } from "./components/grain";
import { MagneticCursor } from "./components/magnetic";
import { CommandPalette } from "./components/command-palette";
import { CaseStudy, projects } from "./components/case-study";
import avatarDark from "../assets/avatar-dark.png";
import avatarLight from "../assets/avatar-light.png";
import bonusCover from "../assets/evidence/bonus.png";

const student = {
  name: "Nguyễn Tuấn Thành",
  handle: "@thanhnguyn",
  studentId: "25112107",
  school: "Đại học Quốc Gia Hà Nội",
  className: "Công nghệ thông tin 2",
  email: "25112107@vnu.edu.vn",
  github: "https://github.com/thanhnguyn",
};

type ProjectCategory = (typeof projects)[number]["category"] | "Tất cả";

const projectCategories: ProjectCategory[] = [
  "Tất cả",
  ...Array.from(new Set(projects.map((p) => p.category))) as (typeof projects)[number]["category"][],
];

const rubricSignals = [
  "Có trang giới thiệu, 6 bài nộp và trang tổng kết",
  "Mỗi bài có link gốc và ảnh chụp minh họa thật",
  "Thiết kế chạy tốt trên desktop và mobile",
  "Avatar 3D đồng bộ theo giao diện hệ thống",
];

const bonusReport = {
  title: "Báo cáo so sánh AI",
  subtitle: "Đánh giá 3 mô hình AI qua năng lực sáng tạo, lập trình và xử lý nhiệm vụ học thuật.",
  summary:
    "Bài bonus đặt ở cuối để người xem mở thêm nếu muốn xem phần mở rộng ngoài 6 bài bắt buộc.",
  link: "https://thanhnguyn.github.io/ai-model-comparison-report/",
  cover: bonusCover,
};

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_top,#142131_0%,#080b10_55%,#040506_100%)] dark:block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(28,20,13,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(28,20,13,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-60 dark:hidden" />
      <div className="absolute -left-32 top-24 h-[360px] w-[360px] rounded-full bg-[#ffb829]/35 blur-[90px] dark:bg-[#ffb829]/20" />
      <div className="absolute right-[-140px] top-[24%] h-[440px] w-[440px] rounded-full bg-[#39a78e]/30 blur-[110px] dark:bg-[#39a78e]/20" />
      <div className="absolute bottom-[-180px] left-[35%] h-[520px] w-[520px] rounded-full bg-[#e85d2c]/25 blur-[130px] dark:bg-[#5b7cfa]/20" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(255,184,41,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,184,41,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45 dark:block" />
    </div>
  );
}

function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Ho_Chi_Minh",
        })
      );
    tick();
    const interval = window.setInterval(tick, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative z-20 mx-auto flex min-h-6 w-full max-w-7xl items-center justify-between px-5 pt-3 font-mono text-xs text-stone-700 dark:text-[#f6efe1]/85 md:hidden">
      <span>{time}</span>
      <span className="flex items-center gap-1.5">
        <MapPin size={11} /> Hà Nội
      </span>
    </div>
  );
}

function Header({ onNavigate }: { onNavigate: (slug: string | null) => void }) {
  const links = [
    { label: "Giới thiệu", href: "#profile" },
    { label: "Dự án", href: "#archive" },
    { label: "Tổng kết", href: "#reflection" },
    { label: "Liên hệ", href: "#contact" },
  ];

  return (
    <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-10">
      <a href="#profile" className="flex items-center gap-2 text-stone-900 dark:text-white">
        <span className="relative h-9 w-9 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-stone-900/25 bg-[#fbf5e8] font-serif text-lg italic text-[#1c140d] shadow-[3px_3px_0_0_#e85d2c] dark:hidden">
            T
          </span>
          <span className="hidden h-9 w-9 place-items-center rounded-full bg-[#1c140d] font-serif text-lg italic text-[#ffb829] shadow-[3px_3px_0_0_#ffb829] dark:grid">
            T
          </span>
        </span>
        <span className="font-serif text-xl">
          Portfolio <span className="text-stone-500 dark:text-white/40">{student.studentId}</span>
        </span>
      </a>

      <nav className="hidden items-center gap-7 text-sm md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-stone-700 transition hover:text-[#e85d2c] dark:text-white/75 dark:hover:text-[#ffb829]"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <CommandPalette onNavigate={(slug) => onNavigate(slug)} />
        <ThemeToggle />
      </div>
    </header>
  );
}

function HeroCard() {
  useEffect(() => {
    [avatarDark, avatarLight].forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 26, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[30px] border border-stone-900/15 bg-[#fbf5e8] p-5 shadow-[10px_10px_0_0_#1c140d] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[10px_10px_0_0_#ffb829] dark:backdrop-blur-xl"
    >
      <div className="absolute right-5 top-5 z-10 rounded-full bg-[#1c140d] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#ffb829] dark:bg-[#ffb829] dark:text-black">
        MSSV {student.studentId}
      </div>

      <div className="relative aspect-square overflow-hidden rounded-[24px] border border-stone-900/10 bg-stone-100 dark:border-white/10 dark:bg-black">
        <ImageWithFallback
          src={avatarLight}
          alt={`Avatar 3D của ${student.name}`}
          loading="eager"
          className="h-full w-full object-cover dark:hidden"
        />
        <ImageWithFallback
          src={avatarDark}
          alt={`Avatar 3D của ${student.name}`}
          loading="eager"
          className="hidden h-full w-full object-cover dark:block"
        />
      </div>

      <div className="mt-6 text-center">
        <h1 className="whitespace-nowrap font-serif text-[clamp(1.55rem,7vw,2.35rem)] leading-tight text-stone-950 dark:text-white">
          {student.name}
        </h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-white/60">
          {student.className} · {student.school}
        </p>
      </div>

        <div className="mt-6 grid grid-cols-3 gap-2 text-center">
        {[
          { value: "06", label: "bài nộp" },
          { value: "03", label: "trang chính" },
          { value: "02", label: "giao diện" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-stone-900/10 bg-white/55 px-2 py-3 dark:border-white/10 dark:bg-white/[0.05]"
          >
            <div className="font-serif text-3xl text-stone-950 dark:text-white">{item.value}</div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-white/45">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <a
          href="#archive"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1c140d] px-4 py-3 text-sm font-medium text-[#fbf5e8] shadow-[3px_3px_0_0_#ffb829] transition hover:-translate-y-0.5 dark:bg-[#ffb829] dark:text-black dark:shadow-[3px_3px_0_0_#1c140d]"
        >
          Mở portfolio <ArrowUpRight size={14} />
        </a>
        <a
          href={`mailto:${student.email}`}
          aria-label="Gửi email"
          className="grid h-12 w-12 place-items-center rounded-full border border-stone-900/20 bg-white text-stone-900 shadow-[2px_2px_0_0_#1c140d] transition hover:-translate-y-0.5 dark:border-white/15 dark:bg-white/5 dark:text-white dark:shadow-[2px_2px_0_0_#ffb829]"
        >
          <Mail size={17} />
        </a>
      </div>
    </motion.article>
  );
}

function Hero() {
  return (
    <section id="profile" className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 md:px-10 md:pt-16 lg:pb-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <HeroCard />
        </div>

        <div className="lg:col-span-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-900/15 bg-[#fbf5e8] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-stone-700 shadow-[2px_2px_0_0_#1c140d] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:shadow-[2px_2px_0_0_#ffb829] dark:backdrop-blur">
            <Sparkles size={12} className="text-[#e85d2c] dark:text-[#ffb829]" />
            Bài tập dự án cá nhân · 2026
          </div>

          <h2 className="max-w-4xl text-balance font-serif text-5xl leading-tight text-stone-950 md:text-7xl lg:text-[7vw] dark:text-white">
            Hồ sơ học tập<br />
            <em className="text-[#e85d2c] dark:text-[#ffb829]">được viết như một hồ sơ nộp bài.</em>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 dark:text-white/70 md:text-lg">
            Mình gom 6 bài nộp của học phần vào một portfolio có cấu trúc rõ ràng:
            3 trang chính là giới thiệu, dự án và tổng kết. Mỗi tuần là một case file riêng, có
            mục tiêu, quá trình, kết quả, link gốc và ảnh chụp minh họa để đối chiếu nhanh.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#archive"
              className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm text-[#fbf5e8] shadow-[3px_3px_0_0_#ffb829] transition hover:-translate-y-0.5 dark:bg-white dark:text-black dark:shadow-[3px_3px_0_0_#ffb829]"
            >
              Mở portfolio <ArrowUpRight size={14} />
            </a>
            <a
              href={student.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-900/30 px-5 py-3 text-sm text-stone-900 transition hover:bg-stone-950 hover:text-[#fbf5e8] dark:border-white/15 dark:text-white/90 dark:hover:bg-white/10"
            >
              GitHub <Github size={14} />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-stone-900/15 pt-6 dark:border-white/10 md:grid-cols-4">
            {rubricSignals.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-stone-700 dark:text-white/65">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#39a78e] dark:text-[#ffb829]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBoard({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const [active, setActive] = useState<ProjectCategory>("Tất cả");

  const filtered = useMemo(
    () => (active === "Tất cả" ? projects : projects.filter((project) => project.category === active)),
    [active]
  );

  return (
    <section id="archive" className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-stone-600 dark:text-white/50">— Bài nộp</p>
          <h3 className="mt-2 text-balance font-serif text-4xl leading-tight text-stone-950 dark:text-white md:text-6xl">
            6 bài nộp, 1 portfolio.
          </h3>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="inline-flex gap-1 rounded-full border border-stone-900/15 bg-[#fbf5e8] p-1 shadow-[3px_3px_0_0_#1c140d] dark:border-white/10 dark:bg-white/5 dark:shadow-[3px_3px_0_0_#ffb829] dark:backdrop-blur">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className="relative whitespace-nowrap rounded-full px-4 py-2 text-sm text-stone-700 dark:text-white/70"
              >
                {active === category && (
                  <motion.span
                    layoutId="project-tab"
                    className="absolute inset-0 rounded-full bg-[#1c140d] dark:bg-[#ffb829]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className={`relative ${active === category ? "text-[#fbf5e8] dark:text-black" : ""}`}>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group relative min-h-[320px] overflow-hidden rounded-[26px] border border-stone-900/15 bg-[#fbf5e8] p-6 shadow-[5px_5px_0_0_#1c140d] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[5px_5px_0_0_#ffb829] dark:backdrop-blur"
            >
              <div
                className="absolute right-[-42px] top-[-42px] h-32 w-32 rounded-full opacity-25 blur-2xl"
                style={{ background: project.color }}
              />

              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-stone-500 dark:text-white/45">{project.week}</p>
                  <h4 className="mt-3 max-w-none text-balance font-serif text-2xl leading-tight text-stone-950 dark:text-white md:text-3xl">
                    {project.title}
                  </h4>
                </div>
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-stone-900/10 bg-white text-stone-950 shadow-[2px_2px_0_0_#1c140d] dark:border-white/10 dark:bg-white/10 dark:text-white dark:shadow-[2px_2px_0_0_#ffb829]"
                  style={{ color: project.color }}
                >
                  <Icon size={21} />
                </span>
              </div>

              <div
                className="mt-5 inline-flex rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-black"
                style={{ background: project.color }}
              >
                {project.category}
              </div>

              <p className="mt-5 text-sm leading-7 text-stone-700 dark:text-white/70">{project.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-stone-900/10 pt-4 dark:border-white/10">
                {project.artifacts.map((artifact) => (
                  <span
                    key={artifact}
                    className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:border-white/10 dark:bg-white/10 dark:text-white/55"
                  >
                    {artifact}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => onOpenProject(project.slug)}
                  data-magnetic
                  data-cursor="open"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm text-[#fbf5e8] transition hover:-translate-y-0.5 dark:bg-white dark:text-black"
                >
                  Xem chi tiết <ArrowUpRight size={14} />
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-stone-900/10 p-2 text-stone-600 transition hover:-translate-y-0.5 hover:text-[#e85d2c] dark:border-white/10 dark:text-white/45 dark:hover:text-[#ffb829]"
                  aria-label={`Open ${project.title}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <div className="mt-6">
        <article className="grid overflow-hidden rounded-[28px] border border-stone-900/15 bg-[#fbf5e8] shadow-[5px_5px_0_0_#1c140d] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[5px_5px_0_0_#ffb829] dark:backdrop-blur lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-stone-900/10 lg:border-b-0 lg:border-r dark:border-white/10">
            <ImageWithFallback
              src={bonusReport.cover}
              alt="Ảnh chụp minh họa báo cáo so sánh AI"
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
              Bonus
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-7">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-stone-600 dark:text-white/50">— Bài thêm</p>
              <h4 className="mt-3 text-balance font-serif text-3xl leading-tight text-stone-950 dark:text-white md:text-4xl">
                {bonusReport.title}
              </h4>
              <p className="mt-3 max-w-xl text-sm leading-7 text-stone-700 dark:text-white/70 md:text-base">
                {bonusReport.subtitle}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-stone-700 dark:text-white/60">
                {bonusReport.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={bonusReport.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm text-[#fbf5e8] transition hover:-translate-y-0.5 dark:bg-white dark:text-black"
              >
                Mở bài bonus <ArrowUpRight size={14} />
              </a>
              <span className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600 dark:border-white/10 dark:bg-white/10 dark:text-white/55">
                Không tính vào 6 bài bắt buộc
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function Reflection() {
  const points = [
    {
      icon: BookOpenCheck,
      title: "Điều học được",
      text: "Biết cách gom bài rời rạc thành một sản phẩm thống nhất, có câu chuyện rõ và có nhịp đọc từ giới thiệu tới kết thúc.",
    },
    {
      icon: Search,
      title: "Thách thức",
      text: "Khó nhất là biến bằng chứng học tập thành thứ người xem hiểu ngay, không chỉ là một đống link và ảnh chụp.",
    },
    {
      icon: Sparkles,
      title: "Áp dụng tiếp",
      text: "Các kỹ năng tổ chức dữ liệu, tìm kiếm nguồn, prompt engineering và AI có trách nhiệm có thể dùng lại cho học tập và dự án nhóm.",
    },
  ];

  return (
    <section id="reflection" className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-stone-600 dark:text-white/50">— Final reflection</p>
          <h3 className="mt-2 text-balance font-serif text-4xl leading-tight text-stone-950 dark:text-white md:text-6xl">
            Tổng kết như một bản tự đánh giá.
          </h3>
        </div>

        <div className="grid gap-4 lg:col-span-7">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <article
                key={point.title}
                className="flex gap-4 rounded-[24px] border border-stone-900/15 bg-[#fbf5e8]/80 p-5 shadow-[4px_4px_0_0_#1c140d] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[4px_4px_0_0_#ffb829] dark:backdrop-blur"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1c140d] text-[#ffb829] dark:bg-[#ffb829] dark:text-black">
                  <Icon size={20} />
                </span>
                <div>
                  <h4 className="font-serif text-2xl leading-tight text-stone-950 dark:text-white">{point.title}</h4>
                  <p className="mt-2 leading-7 text-stone-700 dark:text-white/68">{point.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
      <div className="grid grid-cols-1 gap-8 border-t border-stone-900/15 pt-10 dark:border-white/10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-stone-600 dark:text-white/50">— Submit ready</p>
          <h3 className="mt-2 text-balance font-serif text-5xl leading-tight text-stone-950 dark:text-white md:text-7xl">
            Portfolio sẵn để nộp.
          </h3>
        </div>

        <div className="space-y-3 lg:col-span-6">
          {[
            { icon: Mail, label: "Email VNU", value: student.email, href: `mailto:${student.email}` },
            { icon: Github, label: "GitHub", value: student.handle, href: student.github },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex items-center gap-4 rounded-[22px] border border-stone-900/15 bg-[#fbf5e8] p-4 shadow-[3px_3px_0_0_#1c140d] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[3px_3px_0_0_#ffb829] dark:backdrop-blur"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1c140d] text-[#ffb829] dark:bg-[#ffb829] dark:text-black">
                <item.icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-white/40">
                  {item.label}
                </span>
                <span className="block truncate font-serif text-2xl text-stone-950 dark:text-white">{item.value}</span>
              </span>
              <ArrowUpRight
                size={18}
                className="text-stone-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#e85d2c] dark:text-white/40 dark:group-hover:text-[#ffb829]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileDock() {
  const items = [
    { icon: Home, href: "#profile", label: "Giới thiệu" },
    { icon: Grid3x3, href: "#archive", label: "Dự án" },
    { icon: Search, action: () => window.dispatchEvent(new Event("open-cmd")), label: "Search" },
    { icon: BookOpenCheck, href: "#reflection", label: "Tổng kết" },
    { icon: MessageCircle, href: "#contact", label: "Liên hệ" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 md:hidden" aria-label="Mobile navigation">
      <div className="flex items-center gap-1 rounded-full border border-stone-900/20 bg-[#fbf5e8] p-1.5 shadow-[4px_4px_0_0_#1c140d] dark:border-white/10 dark:bg-white/10 dark:shadow-[4px_4px_0_0_#ffb829] dark:backdrop-blur-xl">
        {items.map((item, index) =>
          "action" in item ? (
            <button
              key={index}
              onClick={item.action}
              className="grid h-11 w-11 place-items-center rounded-full bg-[#e85d2c] text-white shadow-[2px_2px_0_0_#1c140d] transition dark:bg-[#ffb829] dark:text-black dark:shadow-[2px_2px_0_0_#1c140d]"
              aria-label={item.label}
            >
              <item.icon size={18} />
            </button>
          ) : (
            <a
              key={index}
              href={item.href}
              aria-label={item.label}
              className="grid h-11 w-11 place-items-center rounded-full text-stone-700 transition hover:bg-[#1c140d] hover:text-[#ffb829] dark:text-white/80 dark:hover:bg-[#ffb829] dark:hover:text-black"
            >
              <item.icon size={18} />
            </a>
          )
        )}
      </div>
    </nav>
  );
}

export default function App() {
  const [route, setRoute] = useState<string | null>(null);
  const project = projects.find((p) => p.slug === route) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6efe1] text-stone-900 antialiased transition-colors duration-500 dark:bg-[#050607] dark:text-white">
      <style>{`
        body { font-family: 'Inter', system-ui, sans-serif; }
        .font-serif { font-family: 'Noto Serif', Georgia, serif; font-weight: 500; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Background />
      <Grain />
      <MagneticCursor />

      <AnimatePresence mode="wait">
        {project ? (
          <motion.div key={project.slug}>
            <CaseStudy project={project} onBack={() => setRoute(null)} onNavigate={(slug) => setRoute(slug)} />
          </motion.div>
        ) : (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header onNavigate={(slug) => setRoute(slug)} />
            <StatusBar />
            <Hero />
            <ProjectBoard onOpenProject={(slug) => setRoute(slug)} />
            <Reflection />
            <Contact />

            <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-8 pb-28 font-mono text-xs text-stone-600 dark:text-white/50 md:flex-row md:items-center md:px-10 md:pb-8">
            <span>© 2026 {student.name} · Portfolio học phần</span>
            <span>VNU · {student.studentId} · portfolio</span>
          </footer>
        </motion.div>
      )}
      </AnimatePresence>

      <MobileDock />
    </div>
  );
}
