import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BrainCircuit,
  FolderTree,
  FileSearch,
  ShieldCheck,
  UsersRound,
  PenTool,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Magnetic } from "./magnetic";
import { Reveal, RevealWords } from "./reveal";
import coverWeek01 from "../../assets/evidence/week-01.png";
import coverWeek02 from "../../assets/evidence/week-02.png";
import coverWeek03 from "../../assets/evidence/week-03.png";
import coverWeek04 from "../../assets/evidence/week-04.png";
import coverWeek05 from "../../assets/evidence/week-05.png";
import coverWeek06 from "../../assets/evidence/week-06.png";

export type Project = {
  slug: string;
  week: string;
  title: string;
  subtitle: string;
  category: "Nền tảng" | "Nghiên cứu" | "AI" | "Hợp tác" | "Đạo đức";
  color: string;
  cover: string;
  icon:
    | typeof FolderTree
    | typeof FileSearch
    | typeof BrainCircuit
    | typeof UsersRound
    | typeof PenTool
    | typeof ShieldCheck;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { k: string; v: string }[];
  artifacts: string[];
  link: string;
  next: string;
};

export const projects: Project[] = [
  {
    slug: "week-01",
    week: "Week 01",
    title: "Thao tác Windows",
    subtitle: "Quản lý tệp và thư mục",
    category: "Nền tảng",
    color: "#ffb829",
    cover: coverWeek01,
    icon: FolderTree,
    summary:
      "Xây dựng cây thư mục, quy tắc đặt tên và ảnh chụp minh họa để trình bày cách tổ chức dữ liệu học tập trên Windows.",
    problem:
      "Bài yêu cầu chứng minh khả năng quản lý tệp và thư mục bằng một cấu trúc rõ ràng, dễ tìm và dễ mở rộng.",
    approach:
      "Mình chia nội dung theo từng lớp, giữ quy tắc tên thống nhất và đính kèm ảnh chụp minh họa để người xem đọc cấu trúc ngay.",
    outcome:
      "Bộ bài nộp cho thấy cách tổ chức dữ liệu gọn gàng và có thể dùng lại cho các tuần sau.",
    metrics: [
      { k: "Cấu trúc", v: "theo tuần" },
      { k: "Tên file", v: "nhất quán" },
      { k: "Minh họa", v: "có ảnh chụp" },
    ],
    artifacts: ["Cây thư mục", "Quy tắc tên", "Ảnh chụp"],
    link: "https://thanhnguyn.github.io/Intro-to-Digital-Tech/",
    next: "week-02",
  },
  {
    slug: "week-02",
    week: "Week 02",
    title: "Đánh giá nguồn thông tin",
    subtitle: "Tìm kiếm & đánh giá thông tin",
    category: "Nghiên cứu",
    color: "#39a78e",
    cover: coverWeek02,
    icon: FileSearch,
    summary:
      "Phân tích chiến lược tìm kiếm nâng cao, so sánh nguồn và đánh giá độ tin cậy trước khi đưa vào báo cáo.",
    problem:
      "Bài tập yêu cầu không chỉ tìm ra thông tin mà còn giải thích được vì sao một nguồn đáng dùng hơn nguồn khác.",
    approach:
      "Mình dùng các toán tử tìm kiếm như site:, filetype:, intitle: và inurl:, rồi ghi lại tiêu chí đánh giá theo tác giả, độ mới và mức liên quan.",
    outcome:
      "Phần trình bày cuối cho thấy quy trình tìm kiếm có kiểm soát, đủ rõ để người đọc theo dõi cách mình chọn nguồn.",
    metrics: [
      { k: "Toán tử", v: "site / filetype / intitle" },
      { k: "Đánh giá", v: "tác giả, độ mới" },
      { k: "Kết luận", v: "nguồn đáng tin" },
    ],
    artifacts: ["Nhật ký tìm kiếm", "So sánh nguồn", "Đánh giá tin cậy"],
    link: "https://thanhnguyn.github.io/git-visualization-research/#intro",
    next: "week-03",
  },
  {
    slug: "week-03",
    week: "Week 03",
    title: "Prompt Engineering",
    subtitle: "Viết prompt hiệu quả",
    category: "AI",
    color: "#e85d2c",
    cover: coverWeek03,
    icon: BrainCircuit,
    summary:
      "So sánh prompt bản đầu và prompt cải tiến bằng cách thêm vai trò, bối cảnh, ràng buộc và định dạng đầu ra.",
    problem:
      "Yêu cầu mơ hồ khiến phản hồi của AI khó ổn định, nên cần biến nó thành một nhiệm vụ rõ đầu vào và đầu ra.",
    approach:
      "Mình viết nhiều vòng, đổi thứ tự thông tin và thêm tiêu chí để xem chất lượng phản hồi thay đổi ra sao.",
    outcome:
      "Bản cuối cho thấy prompt đã trở thành một bản mô tả nhiệm vụ có thể kiểm chứng.",
    metrics: [
      { k: "Bản nháp", v: "prompt đầu" },
      { k: "Cải tiến", v: "có role/context" },
      { k: "So sánh", v: "output rõ hơn" },
    ],
    artifacts: ["Bản nháp", "Bản cải tiến", "So sánh đầu ra"],
    link: "https://thanhnguyn.github.io/prompt-engineering-report/",
    next: "week-04",
  },
  {
    slug: "week-04",
    week: "Week 04",
    title: "Công cụ hợp tác trực tuyến",
    subtitle: "Hợp tác online cho dự án nhóm",
    category: "Hợp tác",
    color: "#5b7cfa",
    cover: coverWeek04,
    icon: UsersRound,
    summary:
      "Trình bày cách dùng công cụ quản lý dự án để phân công, theo dõi tiến độ và giữ nhịp làm việc chung của nhóm.",
    problem:
      "Bài này cần chứng minh nhóm có tổ chức khi làm việc trực tuyến, không chỉ tạo bảng cho có.",
    approach:
      "Mình mô tả quy trình bằng Kanban, danh sách nhiệm vụ và các mốc cập nhật để mọi người nhìn thấy trạng thái công việc.",
    outcome:
      "Sản phẩm cuối cho thấy workflow nhóm rõ ràng hơn: trách nhiệm, deadline và trạng thái việc được đặt đúng chỗ.",
    metrics: [
      { k: "Board", v: "kanban" },
      { k: "Theo dõi", v: "tiến độ rõ" },
      { k: "Phối hợp", v: "nhịp nhóm" },
    ],
    artifacts: ["Kanban", "Phân công", "Theo dõi tiến độ"],
    link: "https://thanhnguyn.github.io/CS_Project_Collaborative_Tools_2026-/",
    next: "week-05",
  },
  {
    slug: "week-05",
    week: "Week 05",
    title: "AI × Sáng tạo nội dung số",
    subtitle: "Workflow nội dung với AI",
    category: "AI",
    color: "#ff7aa8",
    cover: coverWeek05,
    icon: PenTool,
    summary:
      "Xây dựng sản phẩm nội dung số với AI tạo sinh, từ phác thảo workflow tới hoàn thiện infographic hoặc bài trình bày.",
    problem:
      "Bài này đòi hỏi dùng AI như công cụ hỗ trợ sáng tạo, không để nội dung bị rời rạc hoặc quá máy móc.",
    approach:
      "Mình chia quy trình thành các bước: lên ý tưởng, tạo bản nháp, lọc nội dung, chỉnh visual và chốt đầu ra.",
    outcome:
      "Kết quả là một workflow dễ giải thích và có thể tái sử dụng cho các bài nội dung số khác.",
    metrics: [
      { k: "Workflow", v: "tạo nội dung" },
      { k: "Bản nháp", v: "đã lọc ý" },
      { k: "Sản phẩm", v: "infographic" },
    ],
    artifacts: ["Workflow", "Bản nháp", "Sản phẩm cuối"],
    link: "https://thanhnguyn.github.io/gen-ai-workflow-assignment/",
    next: "week-06",
  },
  {
    slug: "week-06",
    week: "Week 06",
    title: "AI trong học thuật",
    subtitle: "Liêm chính và trách nhiệm",
    category: "Đạo đức",
    color: "#7cc8ff",
    cover: coverWeek06,
    icon: ShieldCheck,
    summary:
      "Phân tích chính sách, xây dựng bộ nguyên tắc cá nhân và phản biện các thách thức đạo đức khi dùng AI trong môi trường đại học.",
    problem:
      "Bài này không chỉ nói về AI có trách nhiệm mà còn phải chuyển nó thành nguyên tắc cá nhân có thể áp dụng được.",
    approach:
      "Mình đọc lại policy, đối chiếu các rủi ro như đạo văn, phụ thuộc AI và thiếu minh bạch, rồi rút ra bộ nguyên tắc riêng.",
    outcome:
      "Bộ nguyên tắc cuối cùng vừa thực tế vừa đủ chặt để dùng trong học tập và các dự án sau này.",
    metrics: [
      { k: "Nguyên tắc", v: "6 điều" },
      { k: "Phân tích", v: "liên hệ policy" },
      { k: "Ứng dụng", v: "trong học tập" },
    ],
    artifacts: ["Ghi chú policy", "Nguyên tắc cá nhân", "Phân tích đạo đức"],
    link: "https://thanhnguyn.github.io/Academic-Integrity-AI/",
    next: "week-01",
  },
];

export function CaseStudy({
  project,
  onBack,
  onNavigate,
}: {
  project: Project;
  onBack: () => void;
  onNavigate: (slug: string) => void;
}) {
  const nextProject = projects.find((p) => p.slug === project.next) ?? projects[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 md:px-10">
        <Magnetic cursor="back">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-stone-900/15 bg-[#fbf5e8] px-4 py-2 text-sm transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white dark:backdrop-blur"
          >
            <ArrowLeft size={14} /> Quay lại
          </button>
        </Magnetic>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-stone-600 dark:text-white/50">
          Bài nộp · {project.week}
        </span>
      </div>

      <section className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: project.color }}>
          — {project.category} · {project.week}
        </p>
        <h1 className="mt-3 max-w-5xl text-balance font-serif text-5xl leading-tight text-stone-950 dark:text-white md:text-7xl lg:text-[7vw]">
          <RevealWords text={project.title} />
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700 dark:text-white/70 md:text-xl">
          <RevealWords text={project.subtitle} delay={0.12} />
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="rounded-[28px] border border-stone-900/15 bg-[#fbf5e8] p-7 shadow-[8px_8px_0_0_#1c140d] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur">
              <div className="flex flex-wrap gap-2">
                {project.artifacts.map((artifact) => (
                  <span
                    key={artifact}
                    className="rounded-full border border-stone-900/10 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-stone-700 dark:border-white/10 dark:bg-white/10 dark:text-white/70"
                  >
                    {artifact}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.v} className="rounded-2xl border border-stone-900/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="font-serif text-4xl leading-tight text-stone-950 dark:text-white" style={{ color: project.color }}>
                      {metric.k}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-white/45">
                      {metric.v}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-stone-700 dark:text-white/70 md:text-lg">
                {project.summary}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[28px] border border-stone-900/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,255,255,0.55))] p-5 shadow-[8px_8px_0_0_#1c140d] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-none dark:backdrop-blur">
              <div className="overflow-hidden rounded-[24px] border border-black/10 bg-black/5">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={project.cover}
                    alt={`Ảnh chụp minh họa của ${project.title}`}
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur">
                    Ảnh chụp minh họa
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-black/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,255,255,0.62))] p-5 dark:border-white/10 dark:bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#1c140d] text-[#ffb829] dark:bg-[#ffb829] dark:text-black">
                    <project.icon size={20} />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 dark:text-white/40">
                      Bản nộp gốc
                    </p>
                    <p className="font-serif text-2xl leading-tight text-stone-950 dark:text-white">{project.week}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:text-white/45">
                      Link gốc
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-2 text-sm text-stone-900 underline decoration-stone-400 underline-offset-4 dark:text-white"
                    >
                      Mở bài nộp <Link2 size={14} />
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 dark:text-white/45">
                      Trọng tâm
                    </p>
                    <p className="mt-1 text-base leading-7 text-stone-700 dark:text-white/70">{project.problem}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-10 px-5 md:px-10 md:mt-24">
        {[
          { title: "Mục tiêu", body: project.problem },
          { title: "Cách làm", body: project.approach },
          { title: "Kết quả", body: project.outcome },
        ].map((block, index) => (
          <Reveal key={block.title} delay={index * 0.05}>
            <div className="grid gap-4 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-3">
                <h2 className="font-serif text-3xl leading-tight text-stone-950 dark:text-white" style={{ color: project.color }}>
                  {block.title}
                </h2>
              </div>
              <div className="md:col-span-9">
                <p className="text-lg leading-8 text-stone-700 dark:text-white/75 md:text-xl">{block.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-10 md:mt-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Bằng chứng", body: "Mỗi bài được gắn link gốc, mô tả đầu ra và lý do tổ chức nội dung." },
            { title: "Trình bày", body: "Cấu trúc được thiết kế để người xem đọc theo tuần, không bị lẫn giữa các nhiệm vụ." },
            { title: "Tính nộp bài", body: "Có đủ phần giới thiệu, 6 case file và tổng kết theo rubric." },
          ].map((item) => (
            <div key={item.title} className="rounded-[22px] border border-stone-900/15 bg-[#fbf5e8] p-5 shadow-[4px_4px_0_0_#1c140d] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-medium text-stone-950 dark:text-white">
                <CheckCircle2 size={16} style={{ color: project.color }} />
                {item.title}
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-700 dark:text-white/65">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 pb-24 md:px-10 md:pb-32 md:mt-24">
        <button onClick={() => onNavigate(nextProject.slug)} className="group block w-full text-left" data-magnetic data-cursor="next">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-stone-600 dark:text-white/50">— Bài kế tiếp</p>
          <h3 className="mt-3 flex flex-wrap items-baseline gap-3 text-balance font-serif text-5xl leading-tight text-stone-950 dark:text-white md:text-[8vw]">
            <span className="transition-transform group-hover:-translate-x-2">{nextProject.title}</span>
            <ArrowUpRight className="transition-transform group-hover:translate-x-4 group-hover:-translate-y-4" size={32} style={{ color: nextProject.color }} />
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700 dark:text-white/65">{nextProject.subtitle}</p>
        </button>
      </section>
    </motion.div>
  );
}
