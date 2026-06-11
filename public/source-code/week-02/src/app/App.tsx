import { Sidebar, SECTIONS } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { Analysis } from "./components/Analysis";
import { SectionHeader } from "./components/SectionHeader";
import { SourceCard } from "./components/SourceCard";
import { sources, typeMeta } from "./components/data";

const READ_WIDTH = 680;
const mono = { fontFamily: "JetBrains Mono, monospace" as const };

import { useEffect, useState } from "react";

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center gap-2">
      <span style={{ ...mono, fontSize: 10, color: "#6B6B6B", letterSpacing: 1.5 }}>{k}</span>
      <span style={{ ...mono, fontSize: 12, color: "#E0DDD5" }}>{v}</span>
    </div>
  );
}

function useUTCClock() {
  const fmt = () => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function TopBar() {
  const utc = useUTCClock();
  return (
    <div
      className="fixed top-0 right-0 flex items-center justify-between px-8"
      style={{
        left: 88,
        height: 40,
        background: "rgba(13,13,13,0.92)",
        borderBottom: "1px solid #1A1A1A",
        zIndex: 40,
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="flex items-center gap-6">
        <span style={{ ...mono, fontSize: 10, color: "#4A7C59", letterSpacing: 1.5 }}>● LIVE</span>
        <span style={{ ...mono, fontSize: 10, color: "#6B6B6B" }}>STATION/DAG-OBS-01 · SECURE CHANNEL</span>
      </div>
      <div className="flex items-center gap-6">
        <Meta k="UTC" v={utc} />
        <Meta k="SRC" v={`${sources.length}/${sources.length}`} />
        <Meta k="TYPES" v={`${Object.keys(typeMeta).length}`} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      style={{
        background: "#0D0D0D",
        color: "#E0DDD5",
        minHeight: "100vh",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Sidebar />
      <TopBar />

      <main style={{ marginLeft: 88, paddingTop: 40 }}>
        <Hero />

        {/* INTRO */}
        <section id="intro" style={{ padding: "100px 80px", borderBottom: "1px solid #1A1A1A" }}>
          <SectionHeader roman="I" title="MỞ ĐẦU" subtitle="Bối cảnh, bài toán và mục tiêu nghiên cứu" />
          <div style={{ maxWidth: READ_WIDTH, color: "#D6D3CA", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>
              Trong kỷ nguyên phát triển phần mềm hiện đại, việc sử dụng các Hệ thống Quản lý Phiên bản (Version Control Systems - VCS) như Git không chỉ là kỹ năng bắt buộc mà còn là nền tảng cốt lõi của làm việc nhóm. Git vận hành dựa trên một mô hình cấu trúc dữ liệu toán học được gọi là <span style={{ color: "#E8701A" }}>Đồ thị có hướng không chu trình (Directed Acyclic Graph - DAG)</span>. Khác với các hệ thống quản lý tuyến tính, kiến trúc DAG cho phép Git thực hiện các thao tác phân nhánh (branching) và gộp nhánh (merging) một cách ưu việt.
            </p>
            <p style={{ marginBottom: 20 }}>
              Tuy nhiên, khi vòng đời của một dự án phần mềm kéo dài, lượng mã nguồn phình to cùng hàng chục nghìn lượt commits từ nhiều lập trình viên khác nhau sẽ biến đồ thị này trở thành một mạng lưới khổng lồ và rối rắm. Bài toán đặt ra: Làm thế nào để <span style={{ color: "#4A7C59" }}>trực quan hóa (visualize)</span> lượng dữ liệu lịch sử này một cách hiệu quả, giúp các kỹ sư, quản lý dự án nhanh chóng nắm bắt được cấu trúc mã nguồn, xác định luồng công việc và đánh giá mức độ đóng góp của từng thành viên?
            </p>
            <p>
              Nhằm giải quyết vấn đề này, báo cáo tập trung thu thập, phân tích và đánh giá 13 nguồn tài liệu uy tín thuộc đa dạng các phân loại (tạp chí khoa học, hội nghị, sách chuyên khảo, blog kỹ thuật và tài liệu gốc). Mục tiêu không chỉ là tìm kiếm các công cụ hiện hành mà còn đào sâu vào tính đúng đắn của các phương pháp nghiên cứu, từ đó rèn luyện kỹ năng tư duy phản biện đối với thông tin học thuật trong lĩnh vực Khoa học Máy tính.
            </p>
          </div>
        </section>

        {/* METHOD */}
        <section id="method" style={{ padding: "100px 80px", borderBottom: "1px solid #1A1A1A" }}>
          <SectionHeader roman="II" title="PHƯƠNG PHÁP VÀ PHẠM VI TÌM KIẾM" subtitle="Chiến lược thu thập, phân loại và sàng lọc tài liệu" />
          <div style={{ maxWidth: READ_WIDTH }}>
            <div style={{ background: "#1A1A1A", padding: 20, borderLeft: "3px solid #4A7C59", marginBottom: 28, ...mono, fontSize: 13, color: "#D6D3CA", lineHeight: 1.7 }}>
              <div style={{ color: "#6B6B6B", fontSize: 10, marginBottom: 8 }}>$ search --query</div>
              "Git visualization" AND<br />
              "software evolution" AND<br />
              "DAG commit history"
            </div>
            <p style={{ color: "#D6D3CA", lineHeight: 1.8, marginBottom: 24 }}>
              Để đảm bảo đáp ứng các tiêu chuẩn khắt khe về tính hệ thống và độ đa dạng của dữ liệu (bao phủ 5 loại nguồn, vượt mức yêu cầu tiêu chuẩn), quy trình thu thập thông tin được thực hiện với chiến lược rõ ràng qua các kênh sau:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[
                { k: "CƠ SỞ DỮ LIỆU HỌC THUẬT", v: "Sử dụng AI Elicit + IEEE Xplore. Lọc từ hội nghị hàng đầu: VISSOFT, ICSME." },
                { k: "SÁCH CHUYÊN KHẢO", v: "Khai thác O'Reilly Media và John Wiley & Sons cho định nghĩa nền tảng." },
                { k: "NGUỒN MỞ INTERNET", v: "Tech Blog từ Medium và The GitHub Engineering Blog — góc nhìn thực chiến." },
                { k: "TÀI LIỆU CHÍNH THỨC", v: "Truy xuất trực tiếp Official Documentation từ Git SCM." },
              ].map((m) => (
                <div key={m.k} style={{ background: "#1A1A1A", padding: 16, borderTop: "2px solid #E8701A" }}>
                  <div style={{ ...mono, fontSize: 10, color: "#E8701A", letterSpacing: 1.5, marginBottom: 8 }}>{m.k}</div>
                  <div style={{ color: "#D6D3CA", fontSize: 13, lineHeight: 1.6 }}>{m.v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { k: "TỔNG NGUỒN", v: "13" },
                { k: "LOẠI NGUỒN", v: "5" },
                { k: "TIÊU CHÍ ĐÁNH GIÁ", v: "5" },
              ].map((m) => (
                <div key={m.k} style={{ background: "#1A1A1A", padding: 16, borderTop: "2px solid #4A7C59" }}>
                  <div style={{ ...mono, fontSize: 10, color: "#6B6B6B", letterSpacing: 1.5 }}>{m.k}</div>
                  <div style={{ ...mono, fontWeight: 700, color: "#E0DDD5", fontSize: 32, marginTop: 4 }}>{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOURCES — curated catalog */}
        <section id="sources" style={{ padding: "100px 80px", borderBottom: "1px solid #1A1A1A" }}>
          <SectionHeader
            roman="III"
            title="BẢNG ĐÁNH GIÁ ĐỘ TIN CẬY CỦA CÁC NGUỒN THÔNG TIN"
            subtitle="13 nguồn · phân loại theo 5 loại tài liệu · đánh giá theo 5 tiêu chí"
          />

          {/* Legend */}
          <div
            className="flex items-center gap-6 mb-10 flex-wrap"
            style={{ paddingBottom: 16, borderBottom: "1px solid #1F1F1F" }}
          >
            <span style={{ ...mono, fontSize: 10, color: "#6B6B6B", letterSpacing: 2 }}>
              LEGEND ▸
            </span>
            {Object.entries(typeMeta).map(([k, t]) => (
              <div key={k} className="flex items-center gap-2">
                <div style={{ width: 14, height: 14, background: t.tint, borderLeft: `3px solid ${t.color}` }} />
                <span style={{ ...mono, fontSize: 11, color: "#9C9890", letterSpacing: 1 }}>{t.label}</span>
              </div>
            ))}
            <span style={{ ...mono, fontSize: 11, color: "#6B6B6B", marginLeft: "auto" }}>
              13 / 13 ENTRIES
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {sources.map((s) => (
              <SourceCard key={s.id} source={s} />
            ))}
          </div>
        </section>

        <Analysis />

        {/* CONCLUSION */}
        <section id="conclusion" style={{ padding: "100px 80px", borderBottom: "1px solid #1A1A1A" }}>
          <SectionHeader roman="V" title="KẾT LUẬN" />
          <div style={{ maxWidth: READ_WIDTH, color: "#D6D3CA", lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>
              Việc đánh giá độ tin cậy của thông tin trong lĩnh vực IT đòi hỏi sự cẩn trọng và cái nhìn đa chiều. Bài báo cáo đã vượt chỉ tiêu đề ra khi khai thác thành công <span style={{ color: "#E8701A" }}>13 nguồn tài liệu</span> thuộc <span style={{ color: "#4A7C59" }}>5 phân loại khác nhau</span>.
            </p>
            <p style={{ marginBottom: 20 }}>
              Sự đối chiếu chéo giữa các tài liệu cho thấy: Nguồn học thuật cung cấp độ tin cậy và sự đột phá về mặt thuật toán, sách chuyên khảo đảm bảo tính nguyên bản của cấu trúc toán học (DAG), trong khi các blog kỹ thuật và tài liệu gốc đảm bảo tính khả thi khi áp dụng vào môi trường doanh nghiệp.
            </p>
            <div style={{ marginTop: 32, padding: 20, background: "#1A1A1A", borderTop: "2px solid #E8701A" }}>
              <div style={{ ...mono, fontSize: 10, color: "#6B6B6B", letterSpacing: 1.5, marginBottom: 8 }}>// GIÁ TRỊ CỐT LÕI</div>
              <ul className="space-y-2" style={{ color: "#D6D3CA" }}>
                <li>▸ Nguồn học thuật → Độ tin cậy + đột phá thuật toán</li>
                <li>▸ Sách chuyên khảo → Tính nguyên bản cấu trúc toán học DAG</li>
                <li>▸ Blog kỹ thuật + Tài liệu gốc → Tính khả thi trong doanh nghiệp</li>
                <li>▸ Kỹ năng tìm kiếm, sàng lọc và tổng hợp → Hành trang cho đồ án thực tế</li>
              </ul>
            </div>
          </div>
        </section>

        {/* REFERENCES */}
        <section id="references" style={{ padding: "100px 80px 160px" }}>
          <SectionHeader roman="VI" title="TÀI LIỆU THAM KHẢO" />
          <ol style={{ maxWidth: 880 }}>
            {sources.map((s) => (
              <li key={s.id} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, padding: "16px 0", borderBottom: "1px solid #1A1A1A" }}>
                <span style={{ ...mono, fontSize: 12, color: "#E8701A" }}>[{String(s.index).padStart(2, "0")}]</span>
                <div style={{ color: "#E0DDD5", lineHeight: 1.5 }}>
                  {s.authors} ({s.year}). <span style={{ fontStyle: "italic" }}>{s.title}</span>. {s.publisher}.
                  {s.doi && <span style={{ color: "#6B6B6B", ...mono, fontSize: 12, marginLeft: 8 }}>doi:{s.doi}</span>}
                </div>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid #1A1A1A", ...mono, fontSize: 10, color: "#6B6B6B", letterSpacing: 1.5, display: "flex", justifyContent: "space-between" }}>
            <span>// KẾT THÚC BÁO CÁO · {SECTIONS.length} PHẦN · {sources.length} NGUỒN</span>
            <span>© 2026 · VJU-ĐHQGHN · Nguyễn Tuấn Thành · 25112107</span>
          </div>
        </section>
      </main>
    </div>
  );
}
