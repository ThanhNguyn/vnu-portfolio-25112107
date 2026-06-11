import { useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Building2,
  GraduationCap,
  MessageSquare,
  Code2,
  CheckCircle2,
  Scale,
  ShieldCheck,
  TrendingDown,
  ShieldAlert,
  BrainCircuit,
  Lock,
  GitCommit,
  BookOpen,
  Check,
  X,
  Lightbulb,
  Bug,
  Compass,
  KeyRound,
  Eye,
  ClipboardCopy,
  Quote,
  Award,
  Rocket,
} from "lucide-react";

/* ---------- True 3D Tilt card with laser border ---------- */
function TiltCard({
  as: Tag = "div",
  className = "",
  intensity = 10,
  children,
  ...rest
}: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width;
    const py = y / r.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt ${className}`}
      {...rest}
    >
      <span className="tilt-laser" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/* ---------- Starfield canvas with mouse parallax ---------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    const stars: { x: number; y: number; z: number; r: number; c: string }[] = [];
    const palette = ["#ffffff", "#A8E6FF", "#C8B6FF", "#7DD3FC"];
    const count = 220;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1 + 0.2,
        r: Math.random() * 1.4 + 0.2,
        c: palette[(Math.random() * palette.length) | 0],
      });
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 30;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 30;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    let t = 0;
    const tick = () => {
      t += 0.016;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const px = s.x + mouse.x * s.z;
        const py = s.y + mouse.y * s.z;
        const tw = 0.6 + Math.sin(t * 1.6 + s.x * 0.01 + s.y * 0.01) * 0.4;
        ctx.globalAlpha = 0.35 + tw * 0.55 * s.z;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
        if (s.z > 0.85) {
          ctx.globalAlpha = 0.18 * s.z;
          ctx.beginPath();
          ctx.arc(px, py, s.r * s.z * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

/* ---------- Reveal-on-scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Letter reveal title ---------- */
function LetterReveal({
  text,
  className = "",
  baseDelay = 0,
  perChar = 28,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  perChar?: number;
}) {
  return (
    <span className={className} aria-label={text} style={{ wordBreak: "keep-all" }}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter"
          style={{ ["--d" as any]: `${baseDelay + i * perChar}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const SectionLabel = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8]">
    <span className="text-[#00F2FE]">{index}</span>
    <span className="h-px w-8 bg-white/15" />
    <span>{label}</span>
  </div>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-mono tracking-[0.18em] uppercase text-[#B8C2D6]">
    {children}
  </span>
);

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen w-full text-[#E6EEF8] font-sans relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0a1024] to-[#0f172a]">
      {/* Deep Space backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0b1430_0%,#020617_55%,#020617_100%)]" />

        {/* Nebula blobs */}
        <div className="absolute -top-40 -left-40 h-[720px] w-[720px] rounded-full bg-[#00F2FE]/18 blur-[170px] blob-a" />
        <div className="absolute top-[8%] -right-40 h-[640px] w-[640px] rounded-full bg-[#6D28D9]/30 blur-[180px] blob-b" />
        <div className="absolute bottom-[-15%] left-[12%] h-[640px] w-[640px] rounded-full bg-[#4FACFE]/18 blur-[180px] blob-c" />
        <div className="absolute top-[45%] right-[18%] h-[420px] w-[420px] rounded-full bg-[#A78BFA]/22 blur-[150px] blob-a" />

        {/* Starfield */}
        <Starfield />

        {/* Floating glass spheres */}
        <div className="sphere sphere-1 drift" style={{ width: 320, height: 320, top: "10%", left: "6%" }} />
        <div className="sphere sphere-2" style={{ width: 220, height: 220, top: "60%", left: "78%" }} />
        <div className="sphere sphere-3" style={{ width: 180, height: 180, top: "82%", left: "10%" }} />
        <div className="sphere sphere-4" style={{ width: 260, height: 260, top: "32%", left: "60%" }} />

        {/* Animated grid + vignette */}
        <div className="absolute inset-0 grid-bg-anim opacity-[0.35]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_92%)]" />

        {/* Noise */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* Top nav */}
      <header className="relative z-20 px-6 lg:px-12 pt-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-xl glass-strong grid place-items-center">
              <Sparkles className="h-4 w-4 text-[#00F2FE]" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 rounded-full bg-[#00F2FE] pulse-dot shadow-[0_0_12px_#00F2FE]" />
            </div>
            <div className="leading-tight">
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8A95A8]">VNU // Report</div>
              <div className="text-sm">AI in Academia</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-[13px] text-[#B8C2D6]">
            <a className="hover:text-white transition" href="#policy">Policy</a>
            <a className="hover:text-white transition" href="#case">Case Study</a>
            <a className="hover:text-white transition" href="#ethics">Ethics</a>
            <a className="hover:text-white transition" href="#code">Code of Conduct</a>
          </nav>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[#8A95A8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] pulse-dot" />
            <span>v1.0 · 2026</span>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-6 lg:px-12 pt-24 pb-32">
        <div className="mx-auto max-w-6xl flex flex-col items-center text-center">
          <div className="reveal">
            <Pill>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_10px_#00F2FE]" />
              Báo cáo học thuật · 2026
            </Pill>
          </div>

          <h1 className="mt-10 text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[5.25rem] leading-[1.05] tracking-tight font-semibold max-w-5xl">
            <LetterReveal text="Trí Tuệ Nhân Tạo" className="shimmer" baseDelay={100} />
            <span className="block text-white/95 mt-1">
              <LetterReveal text="Trong Học Thuật:" baseDelay={650} />
            </span>
            <span className="block text-white/55 italic font-light mt-1" style={{ fontSize: "0.72em" }}>
              <LetterReveal text="Công Cụ Trợ Lực Hay Hiểm Họa Mềm?" baseDelay={1150} perChar={22} />
            </span>
          </h1>

          <p className="reveal mt-8 max-w-2xl text-[15px] md:text-base leading-relaxed text-[#9AA6BC]" style={{ ["--rd" as any]: "1700ms" }}>
            Báo cáo Phân tích Tác động và Xây dựng Nguyên tắc sử dụng AI có trách nhiệm —
            trong môi trường giáo dục đại học và nghiên cứu kỹ thuật phần mềm.
          </p>

          {/* Glossy Author card */}
          <div
            className="reveal mt-14 w-full max-w-3xl gloss rounded-2xl p-6 md:p-7"
            style={{ ["--rd" as any]: "1900ms" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="flex items-center gap-3 md:pr-6 pb-4 md:pb-0">
                <div className="h-10 w-10 rounded-full glass grid place-items-center">
                  <GraduationCap className="h-4 w-4 text-[#00F2FE]" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A95A8]">Sinh viên</div>
                  <div className="text-sm">Nguyễn Tuấn Thành</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:px-6 py-4 md:py-0">
                <div className="h-10 w-10 rounded-full glass grid place-items-center">
                  <KeyRound className="h-4 w-4 text-[#4FACFE]" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A95A8]">Mã SV</div>
                  <div className="id-scan inline-block px-2 py-0.5 rounded-md text-sm font-mono tracking-widest text-[#00F2FE] bg-[#00F2FE]/5 border border-[#00F2FE]/20">
                    25112107
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:pl-6 pt-4 md:pt-0">
                <div className="h-10 w-10 rounded-full glass grid place-items-center">
                  <Building2 className="h-4 w-4 text-[#A78BFA]" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A95A8]">Đại học</div>
                  <div className="text-sm">QG Hà Nội (VNU)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-[#8A95A8]" style={{ ["--rd" as any]: "2100ms" }}>
            <span>Generative AI</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Academic Integrity</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Software Engineering</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Process-Oriented</span>
          </div>
        </div>
      </section>

      {/* POLICY */}
      <section id="policy" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
            <div>
              <SectionLabel index="01" label="Policy Landscape" />
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                So sánh khung pháp lý <span className="text-gradient">Generative AI</span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#9AA6BC] leading-relaxed">
              Phân tích đối chiếu giữa thực trạng tại Việt Nam và một điển cứu quốc tế tiêu biểu —
              nhằm xác định khoảng trống thể chế cần lấp đầy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TiltCard className="reveal glass rounded-2xl p-8 md:p-10 relative overflow-hidden" style={{ ["--rd" as any]: "100ms" }}>
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#FF5570]/15 blur-3xl" />
              <div>
                <div className="flex items-start justify-between">
                  <Pill>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF5570]" />
                    Đang vận hành
                  </Pill>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A95A8]">VN · VNU</span>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl glass-strong grid place-items-center">
                    <Building2 className="h-6 w-6 text-[#FF8FA3]" />
                  </div>
                  <h3 className="text-2xl md:text-[28px] tracking-tight">Thực trạng tại VNU & Việt Nam</h3>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-[#B8C2D6]">
                  Hiện nay, VNU và các trường thành viên chủ yếu quản lý tính liêm chính thông qua các quy định về <em className="text-white/90 not-italic underline decoration-[#FF5570]/50 underline-offset-4">chống đạo văn và gian lận học thuật truyền thống</em>. Chưa có văn bản hướng dẫn chi tiết về việc sử dụng <span className="font-mono text-[#00F2FE]">Generative AI</span> trong bài tập lập trình hay đồ án kỹ thuật. Ranh giới giữa "tham khảo" và "gian lận" phần lớn vẫn dựa trên đánh giá chủ quan của giảng viên.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
                  {[
                    { k: "Khung Gen-AI", v: "Chưa có" },
                    { k: "Cơ chế", v: "Phản ứng" },
                    { k: "Trách nhiệm", v: "Mơ hồ" },
                  ].map((s) => (
                    <div key={s.k} className="bg-[#0B1220]/70 px-4 py-4">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A95A8]">{s.k}</div>
                      <div className="mt-2 text-sm">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            <TiltCard className="reveal glass rounded-2xl p-8 md:p-10 relative overflow-hidden" style={{ ["--rd" as any]: "220ms" }}>
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#00F2FE]/20 blur-3xl" />
              <div>
                <div className="flex items-start justify-between">
                  <Pill>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FE]" />
                    Tham chiếu quốc tế
                  </Pill>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A95A8]">US · MIT</span>
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl glass-strong grid place-items-center">
                    <GraduationCap className="h-6 w-6 text-[#00F2FE]" />
                  </div>
                  <h3 className="text-2xl md:text-[28px] tracking-tight">Điển cứu tham chiếu (MIT)</h3>
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-[#B8C2D6]">
                  <span className="text-white">Trách nhiệm tuyệt đối (Absolute Accountability):</span> Sinh viên được phép sử dụng AI như công cụ hỗ trợ nhưng phải chịu <span className="text-[#00F2FE]">100%</span> trách nhiệm về tính chính xác và bảo mật. "Ảo giác AI" không được chấp nhận làm lý do biện minh. Nghiêm cấm sử dụng AI để giải quyết các <em className="text-white/90 not-italic underline decoration-[#00F2FE]/50 underline-offset-4">bài kiểm tra đánh giá năng lực tư duy lập trình căn bản</em>.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
                  {[
                    { k: "Khung Gen-AI", v: "Độc lập" },
                    { k: "Cơ chế", v: "Chủ động" },
                    { k: "Trách nhiệm", v: "100%" },
                  ].map((s) => (
                    <div key={s.k} className="bg-[#0B1220]/70 px-4 py-4">
                      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A95A8]">{s.k}</div>
                      <div className="mt-2 text-sm">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          <figure className="reveal mt-10 relative glass-strong rounded-2xl p-10 md:p-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,242,254,0.15),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.18),transparent_60%)]" />
            <Quote className="relative h-10 w-10 text-[#00F2FE]/70" />
            <blockquote className="relative mt-6 text-2xl md:text-[34px] leading-[1.25] tracking-tight max-w-5xl">
              <span className="text-white/55">&ldquo;Thay vì cấm đoán, </span>
              <span className="text-white">hệ thống giáo dục cần chuyển sang </span>
              <span className="text-gradient">đánh giá quá trình</span>
              <span className="text-white/55"> (Process-oriented assessment).&rdquo;</span>
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8]">
              <span className="h-px w-10 bg-white/20" />
              Đề xuất chính sách · Section 1.4
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CASE STUDY */}
      <section id="case" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal">
            <SectionLabel index="02" label="Case Study · C++ / Judge Online" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">
              Nhiệm vụ học tập:{" "}
              <span className="text-gradient">Tối ưu kiến trúc Judge Online (C++)</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[#9AA6BC] leading-relaxed">
              Nhiệm vụ: Thiết kế kiến trúc lõi và tối ưu hóa bộ nhớ cho hệ thống Judge Online (C++) —
              một hệ thống chấm điểm lập trình tự động. Quy trình ba bước minh họa cách tích hợp AI có trách nhiệm.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12">
            <ol className="relative">
              <span className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-[#00F2FE]/60 via-[#4FACFE]/40 to-[#A78BFA]/30" />
              {[
                {
                  Icon: MessageSquare,
                  step: "01",
                  title: "Tương tác AI",
                  body:
                    "Prompt 1: Gợi ý Class Diagram cho Online Judge (C++23) — AI đề xuất SubmissionManager, SecuritySandbox, ResultEmitter. Prompt 2: Phân tích lỗi Memory Leak khi làm việc với fork()/execve() — AI gợi ý Smart Pointers nhưng lạm dụng raw pointers.",
                  meta: "Input · LLM",
                  tone: "from-[#00F2FE]/30 to-transparent",
                  tag: "#00F2FE",
                  d: 100,
                },
                {
                  Icon: Code2,
                  step: "02",
                  title: "Đánh giá & Tinh chỉnh",
                  body:
                    "Tự viết lại toàn bộ logic, chuyển đổi hệ thống sang std::unique_ptr và std::shared_ptr để đảm bảo an toàn bộ nhớ tuyệt đối — điều AI chỉ gợi ý ở mức khái niệm. Xác minh bằng Valgrind.",
                  meta: "Refactor · Verify",
                  tone: "from-[#4FACFE]/30 to-transparent",
                  tag: "#4FACFE",
                  d: 220,
                },
                {
                  Icon: CheckCircle2,
                  step: "03",
                  title: "Trích dẫn minh bạch",
                  body:
                    "\"Báo cáo và mã nguồn có sử dụng AI để tham khảo kiến trúc ban đầu. Triển khai chi tiết, kiểm soát an toàn bộ nhớ và kiểm thử thực tế được thực hiện độc lập bởi sinh viên.\"",
                  meta: "Attribution · README",
                  tone: "from-[#A78BFA]/30 to-transparent",
                  tag: "#A78BFA",
                  d: 340,
                },
              ].map(({ Icon, step, title, body, meta, tone, tag, d }) => (
                <li key={step} className="relative pl-20 pb-10 last:pb-0 reveal" style={{ ["--rd" as any]: `${d}ms` }}>
                  <div className="absolute left-0 top-0">
                    <div className="relative h-14 w-14 rounded-2xl glass-strong grid place-items-center">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tone} opacity-80`} />
                      <Icon className="relative h-5 w-5" style={{ color: tag }} />
                    </div>
                  </div>
                  <TiltCard intensity={6} className="glass rounded-2xl p-6 md:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8]">
                        Step {step} · {meta}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/30" />
                    </div>
                    <h3 className="mt-3 text-xl md:text-2xl tracking-tight">{title}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-[#B8C2D6]">{body}</p>
                  </TiltCard>
                </li>
              ))}
            </ol>

            <aside className="reveal glass-strong rounded-2xl overflow-hidden h-fit lg:sticky lg:top-10" style={{ ["--rd" as any]: "200ms" }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5570]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F4C56C]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A95A8]">
                  judge_engine.cpp
                </span>
                <ClipboardCopy className="h-3.5 w-3.5 text-white/40" />
              </div>
              <pre className="font-mono text-[12.5px] leading-[1.75] p-6 text-[#B8C2D6] overflow-x-auto">
{`// Before — AI suggestion (raw pointers)
Sandbox* box = new Sandbox(cfg);
box->run(submission);
delete box;  // leak risk

// After — student refactor
auto box = std::`}<span className="text-[#00F2FE]">unique_ptr</span>{`<Sandbox>(
  std::make_unique<Sandbox>(cfg)
);
box->run(submission);

// $ valgrind --leak-check=full ./judge
`}<span className="text-[#34D399]">{`// definitely lost: 0 bytes  ✓`}</span>
              </pre>
              <div className="px-5 py-4 border-t border-white/8 grid grid-cols-3 gap-px bg-white/5 text-center">
                {[
                  { k: "Leaks", v: "0", c: "#34D399" },
                  { k: "Latency", v: "−38%", c: "#00F2FE" },
                  { k: "AI assist", v: "Cited", c: "#A78BFA" },
                ].map((s) => (
                  <div key={s.k} className="bg-[#0B1220]/70 py-3">
                    <div className="text-base" style={{ color: s.c }}>{s.v}</div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8A95A8] mt-1">{s.k}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ETHICAL ISSUES */}
      <section id="ethics" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 reveal">
            <div>
              <SectionLabel index="03" label="Ethical Frontiers" />
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl">
                Ba <span className="text-gradient">vùng xám</span> đạo đức cốt lõi
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#9AA6BC] leading-relaxed">
              Nhận diện các rủi ro hệ thống mà sinh viên kỹ thuật phải đối mặt
              khi tích hợp AI vào quy trình học tập và sản xuất phần mềm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                Icon: Scale,
                num: "I.",
                title: "Ranh giới Hỗ trợ vs Gian lận",
                body:
                  "Sử dụng AI để giải thích khái niệm phức tạp hoặc gợi ý cấu trúc code là \"hỗ trợ\". Tuy nhiên, đưa đề bài vào AI để nhận kết quả nộp mà không qua tư duy độc lập là \"gian lận\" — tước bỏ cơ hội phát triển kỹ năng giải quyết vấn đề.",
                accent: "#00F2FE",
                pair: ["Boilerplate", "Toàn bộ giải thuật"],
                d: 100,
              },
              {
                Icon: ShieldCheck,
                num: "II.",
                title: "Rủi ro Sở hữu trí tuệ",
                body:
                  "Mã nguồn do AI tạo ra thường được tổng hợp từ các dự án mã nguồn mở (Open Source). Sử dụng lại mà không kiểm tra giấy phép (License) hoặc không khai báo sự đóng góp của AI là vi phạm quyền sở hữu trí tuệ.",
                accent: "#4FACFE",
                pair: ["GPL", "MIT"],
                d: 220,
              },
              {
                Icon: TrendingDown,
                num: "III.",
                title: "Bào mòn kỹ năng lõi",
                body:
                  "Sự phụ thuộc vào AI (Over-reliance) làm giảm khả năng tự gỡ lỗi và đọc hiểu tài liệu kỹ thuật. Mất đi kỹ năng \"vật lộn\" với code dẫn đến hổng kiến thức căn bản về hệ thống.",
                accent: "#A78BFA",
                pair: ["Logic", "Manual Debug"],
                d: 340,
              },
            ].map(({ Icon, num, title, body, accent, pair, d }) => (
              <TiltCard
                key={title}
                intensity={9}
                className="reveal glass rounded-2xl p-8"
                style={{ ["--rd" as any]: `${d}ms`, ["--c" as any]: accent }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="h-14 w-14 rounded-2xl grid place-items-center glass-strong"
                    style={{ boxShadow: `inset 0 0 0 1px ${accent}30` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: accent }} />
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8]">
                    Risk · {num}
                  </span>
                </div>
                <h3 className="mt-8 text-xl tracking-tight">{title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#B8C2D6]">{body}</p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="px-2.5 py-1 rounded-md glass" style={{ color: accent }}>{pair[0]}</span>
                  <span className="text-white/30">vs</span>
                  <span className="px-2.5 py-1 rounded-md glass text-[#FF8FA3]">{pair[1]}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CODE OF CONDUCT */}
      <section id="code" className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
            <div className="reveal">
              <SectionLabel index="04" label="Personal Manifest" />
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight">
                Tiêu chuẩn ứng xử với AI
                <br />
                <span className="text-gradient">(Code of Conduct)</span>
              </h2>
              <p className="mt-6 max-w-md text-sm text-[#9AA6BC] leading-relaxed">
                Năm nguyên tắc cá nhân được thiết lập để bảo toàn năng lực kỹ sư
                và tính toàn vẹn học thuật trong kỷ nguyên Generative AI.
              </p>
              <div className="mt-10 glass rounded-2xl p-6 max-w-md">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8]">
                    Compliance Score
                  </span>
                  <span className="font-mono text-[#00F2FE]">5 / 5</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#A78BFA]" />
                </div>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                { Icon: ShieldAlert, k: "Zero-Trust Policy", v: "Mọi kết quả từ AI mặc định là có lỗi cho đến khi được chạy thực nghiệm và đối chiếu với tài liệu chính thống." },
                { Icon: BrainCircuit, k: "Think First, Ask Later", v: "Luôn tự phác thảo giải pháp cá nhân trước khi sử dụng AI để tối ưu hóa hiệu suất." },
                { Icon: Lock, k: "Data Privacy", v: "Tuyệt đối không tải lên mã nguồn nhạy cảm, thông tin định danh cá nhân hoặc API Keys lên các mô hình AI công cộng." },
                { Icon: GitCommit, k: "Radical Transparency", v: "Khai báo cụ thể các phần việc có sự đóng góp của AI trong mọi báo cáo và sản phẩm." },
                { Icon: BookOpen, k: "Fundamentals First", v: "Không sử dụng AI để thay thế việc học kiến thức cốt lõi: Giải thuật, Cấu trúc dữ liệu, Hệ điều hành." },
              ].map(({ Icon, k, v }, i) => (
                <TiltCard
                  as="li"
                  key={k}
                  intensity={5}
                  className="reveal glass rounded-2xl p-5 md:p-6 flex items-start gap-5"
                  style={{ ["--rd" as any]: `${100 + i * 90}ms` }}
                >
                  <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A95A8] pt-1.5 w-8">
                    0{i + 1}
                  </div>
                  <div className="h-11 w-11 shrink-0 rounded-xl glass-strong grid place-items-center">
                    <Icon className="h-5 w-5 text-[#4FACFE]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-[17px] tracking-tight">{k}</h3>
                      <span className="hidden md:inline-flex h-px flex-1 bg-white/8" />
                    </div>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-[#B8C2D6]">{v}</p>
                  </div>
                  <div className="shrink-0 h-7 w-7 rounded-full grid place-items-center bg-[#00F2FE]/10 border border-[#00F2FE]/40">
                    <Check className="h-3.5 w-3.5 text-[#00F2FE]" strokeWidth={3} />
                  </div>
                </TiltCard>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DO / DON'T */}
      <section className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal">
            <SectionLabel index="05" label="Operational Playbook" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">
              Khi nào <span className="text-[#34D399]">nên</span> &mdash; và khi nào{" "}
              <span className="text-[#FF5570]" style={{ whiteSpace: "nowrap" }}>tuyệt đối không</span>
            </h2>
          </div>

          <div className="reveal mt-12 glass-strong rounded-3xl p-1.5 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden">
              <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#34D399]/10 via-transparent to-transparent border-b md:border-b-0 md:border-r border-white/8">
                <div className="absolute top-6 right-6 font-mono text-[11px] tracking-[0.3em] uppercase text-[#34D399]/80">
                  DO ✓
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl grid place-items-center glass border-[#34D399]/30">
                    <Check className="h-5 w-5 text-[#34D399]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl tracking-tight">Sử dụng có trách nhiệm</h3>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    { Icon: Lightbulb, t: "Brainstorm ý tưởng", s: "Khởi tạo, mở rộng và đối thoại với một quan điểm thứ hai để phát triển ý tưởng." },
                    { Icon: Bug, t: "Phân tích Error Logs", s: "Diễn giải stack trace, thu hẹp giả thuyết khi debug hiệu quả hơn." },
                    { Icon: Compass, t: "Tìm hiểu khái niệm mới", s: "Tóm lược paper, làm rõ thuật ngữ kỹ thuật — sau đó đọc nguồn gốc để xác minh." },
                  ].map(({ Icon, t, s }) => (
                    <li key={t} className="group flex items-start gap-4 rounded-xl p-4 hover:bg-[#34D399]/5 border border-transparent hover:border-[#34D399]/20 transition">
                      <div className="h-10 w-10 shrink-0 rounded-lg glass grid place-items-center">
                        <Icon className="h-4 w-4 text-[#34D399]" />
                      </div>
                      <div>
                        <div className="text-[15px]">{t}</div>
                        <div className="text-[13px] text-[#9AA6BC] mt-1 leading-relaxed">{s}</div>
                      </div>
                      <Check className="h-4 w-4 text-[#34D399]/70 mt-1 ml-auto" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative p-8 md:p-10 bg-gradient-to-br from-[#FF5570]/10 via-transparent to-transparent">
                <div className="absolute top-6 right-6 font-mono text-[11px] tracking-[0.3em] uppercase text-[#FF5570]/80">
                  DON'T ✕
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl grid place-items-center glass border-[#FF5570]/30">
                    <X className="h-5 w-5 text-[#FF5570]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl tracking-tight">Lằn ranh đỏ</h3>
                </div>
                <ul className="mt-8 space-y-3">
                  {[
                    { Icon: ClipboardCopy, t: "Copy/Paste mã nguồn lõi mù quáng", s: "Đặc biệt với thuật toán cốt lõi của bài tập đánh giá năng lực tư duy lập trình." },
                    { Icon: KeyRound, t: "Rò rỉ dữ liệu nhạy cảm vào prompt", s: "Bí mật, mã nguồn nội bộ, PII và API Keys — không bao giờ rời máy của bạn." },
                    { Icon: Eye, t: "Bỏ qua bước Review Code", s: "Mọi đoạn AI sinh ra phải đi qua kiểm tra, test và đọc kỹ trước khi sử dụng." },
                  ].map(({ Icon, t, s }) => (
                    <li key={t} className="group flex items-start gap-4 rounded-xl p-4 hover:bg-[#FF5570]/5 border border-transparent hover:border-[#FF5570]/20 transition">
                      <div className="h-10 w-10 shrink-0 rounded-lg glass grid place-items-center">
                        <Icon className="h-4 w-4 text-[#FF5570]" />
                      </div>
                      <div>
                        <div className="text-[15px]">{t}</div>
                        <div className="text-[13px] text-[#9AA6BC] mt-1 leading-relaxed">{s}</div>
                      </div>
                      <X className="h-4 w-4 text-[#FF5570]/70 mt-1 ml-auto" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="relative z-10 px-6 lg:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="reveal">
            <SectionLabel index="06" label="Conclusion" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">
              AI — <span className="text-gradient">Đòn bẩy</span> hay Gánh nặng?
            </h2>
          </div>

          <div className="reveal mt-12 glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,242,254,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.15),transparent_50%)]" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-2xl glass-strong grid place-items-center">
                  <Award className="h-6 w-6 text-[#00F2FE]" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A95A8]">Kết luận</div>
                  <div className="text-xl tracking-tight">Verify by Human, Accelerated by AI</div>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-[#B8C2D6] max-w-4xl">
                Việc sử dụng AI trong học thuật không chỉ là vấn đề về kỹ năng công nghệ mà còn là bài thử nghiệm về <span className="text-white">đạo đức và sự liêm chính</span> của sinh viên. Bằng cách tuân thủ các nguyên tắc từ MIT và VNU, AI sẽ trở thành một <span className="text-gradient">đòn bẩy mạnh mẽ</span> giúp sinh viên tối ưu hóa quá trình học tập mà vẫn đảm bảo được giá trị cốt lõi của tri thức.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
                  <Rocket className="h-4 w-4 text-[#00F2FE]" />
                  <span className="text-sm">Co-pilot, không phải Autopilot</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
                  <ShieldCheck className="h-4 w-4 text-[#34D399]" />
                  <span className="text-sm">Process &gt; Product</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
                  <BrainCircuit className="h-4 w-4 text-[#A78BFA]" />
                  <span className="text-sm">Fundamentals First</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-6 lg:px-12 py-14 border-t border-white/8 mt-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl glass-strong grid place-items-center">
              <Sparkles className="h-4 w-4 text-[#00F2FE]" />
            </div>
            <div className="leading-tight">
              <div className="text-sm">AI in Academia · A Soft Hazard Inquiry</div>
              <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A95A8] mt-1">
                © 2026 Nguyễn Tuấn Thành · 25112107 · VNU
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.28em] uppercase text-[#8A95A8]">
            <span>Compiled · v1.0</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Ha Noi · 21°02'N</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-[#00F2FE]">Process &gt; Product</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
