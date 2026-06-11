import { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

const mono = { fontFamily: "JetBrains Mono, monospace" as const };
const READ = 680;

function Term({
  children,
  color = "#E8701A",
  tooltip,
}: {
  children: ReactNode;
  color?: string;
  tooltip?: string;
}) {
  return (
    <span
      title={tooltip}
      style={{
        ...mono,
        color,
        fontWeight: 700,
        fontSize: "0.92em",
        padding: "1px 6px",
        background: "rgba(232,112,26,0.08)",
        borderBottom: `1px solid ${color}`,
        cursor: tooltip ? "help" : "inherit",
      }}
    >
      {children}
    </span>
  );
}

function PullQuote({
  children,
  attribution,
}: {
  children: ReactNode;
  attribution: string;
}) {
  return (
    <figure
      style={{
        margin: "40px 0",
        padding: "32px 36px",
        borderTop: "1px solid #2A2A2A",
        borderBottom: "1px solid #2A2A2A",
        position: "relative",
      }}
    >
      <span
        style={{
          ...mono,
          position: "absolute",
          top: -14,
          left: 24,
          background: "#0D0D0D",
          padding: "0 12px",
          color: "#E8701A",
          fontSize: 28,
          lineHeight: 1,
        }}
      >
        "
      </span>
      <blockquote
        style={{
          ...mono,
          fontSize: 22,
          fontWeight: 500,
          color: "#E0DDD5",
          lineHeight: 1.45,
          letterSpacing: -0.2,
        }}
      >
        {children}
      </blockquote>
      <figcaption
        style={{
          ...mono,
          marginTop: 16,
          fontSize: 11,
          color: "#6B6B6B",
          letterSpacing: 1.5,
        }}
      >
        — {attribution}
      </figcaption>
    </figure>
  );
}

function Callout({
  label,
  title,
  body,
  color,
}: {
  label: string;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <aside
      style={{
        margin: "32px 0",
        background: "#141414",
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 24,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div>
        <div
          style={{
            ...mono,
            fontSize: 9,
            letterSpacing: 2,
            color,
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            ...mono,
            fontWeight: 700,
            color: "#E0DDD5",
            fontSize: 16,
            letterSpacing: 1,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ color: "#B8B5AC", fontSize: 14, lineHeight: 1.6 }}>
        {body}
      </div>
    </aside>
  );
}

function Subsection({
  num,
  title,
  glyph,
  children,
}: {
  num: string;
  title: string;
  glyph: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 96 }}>
      {/* Subsection header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
          marginBottom: 32,
          maxWidth: READ + 80,
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 48,
            fontWeight: 700,
            color: "#E8701A",
            lineHeight: 0.9,
            minWidth: 80,
          }}
        >
          {num}
        </div>
        <div style={{ flex: 1, paddingTop: 6 }}>
          <div
            style={{
              ...mono,
              fontSize: 10,
              color: "#6B6B6B",
              letterSpacing: 2,
              marginBottom: 6,
            }}
          >
            {glyph} SUBSECTION
          </div>
          <h3
            style={{
              ...mono,
              fontWeight: 700,
              color: "#E0DDD5",
              fontSize: 24,
              lineHeight: 1.2,
              letterSpacing: -0.3,
            }}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: READ + 60 }}>{children}</div>
    </div>
  );
}

// Drop-cap first paragraph
function Lede({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        color: "#E0DDD5",
        fontSize: 17,
        lineHeight: 1.75,
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        color: "#D6D3CA",
        fontSize: 16,
        lineHeight: 1.8,
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );
}

// Transition between subsections
function Transition({ to }: { to: string }) {
  return (
    <div
      style={{
        margin: "48px auto 64px",
        maxWidth: READ + 60,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ height: 1, background: "#1F1F1F" }} />
      <div
        style={{
          ...mono,
          fontSize: 10,
          color: "#6B6B6B",
          letterSpacing: 2,
        }}
      >
        ↓ &nbsp; {to} &nbsp; ↓
      </div>
      <div style={{ height: 1, background: "#1F1F1F" }} />
    </div>
  );
}

export function Analysis() {
  return (
    <section
      id="analysis"
      style={{ padding: "100px 80px", borderBottom: "1px solid #1A1A1A" }}
    >
      <SectionHeader
        roman="IV"
        title="PHÂN TÍCH VÀ TỔNG HỢP KIẾN THỨC CHUYÊN SÂU"
        subtitle="Ba góc nhìn: cấu trúc DAG, phân tích ngữ nghĩa, và thực tiễn công nghiệp"
      />

      {/* 4.1 */}
      <Subsection
        num="4.1"
        glyph="◆"
        title="Từ cấu trúc DAG đến giới hạn của các công cụ truyền thống"
      >
        <Lede>
          Như đã được chứng minh trong Sách chuyên khảo của Ponuthorai (Nguồn 7) và Tài liệu kỹ thuật gốc (Nguồn 13), lõi của Git là một cơ sở dữ liệu Key-Value lưu trữ các đối tượng (blob, tree, commit). Các commit này liên kết với nhau bằng con trỏ{" "}
          <Term tooltip="Secure Hash Algorithm">SHA-1</Term> tạo thành đồ thị{" "}
          <Term tooltip="Directed Acyclic Graph — đồ thị có hướng không chu trình">
            DAG
          </Term>.
        </Lede>
        <P>
          Ở mức độ cơ bản, bài viết của Cichelli (Nguồn 11) và Elsen (Nguồn 6) đã mô hình hóa đồ thị này rất tốt. Tuy nhiên, Elsen cũng chỉ ra nhược điểm chí mạng: Khi áp dụng biểu đồ Sunburst hoặc đồ thị nốt (node-link diagrams) cho một dự án có tuổi đời vài năm với hàng chục nhánh song song, giao diện sẽ rơi vào tình trạng "spaghetti" — các đường nối đan chéo vào nhau gây quá tải nhận thức cho kỹ sư phần mềm.
        </P>

        <PullQuote attribution="Ponuthorai & Loeliger, 2022 — Version Control with Git, 3rd Ed.">
          Git không lưu các thay đổi, Git lưu các snapshot — và các snapshot ấy
          được kết nối thành một DAG bất biến thông qua hash mật mã.
        </PullQuote>

        <P>
          Đây chính là khoảng trống mà các nghiên cứu trực quan hoá hiện đại tìm cách lấp đầy — và là động lực cho sự ra đời của các công cụ như Githru (Nguồn 1) hay Git-Truck (Nguồn 2, 3).
        </P>
      </Subsection>

      <Transition to="TỪ ĐẾM DÒNG CODE ĐẾN PHÂN TÍCH NGỮ NGHĨA" />

      {/* 4.2 */}
      <Subsection
        num="4.2"
        glyph="◇"
        title="Sự tiến hóa trong phương pháp: Từ đếm dòng code đến phân tích ngữ nghĩa"
      >
        <Lede>
          Để giải quyết bài toán "nhiễu" dữ liệu, các nghiên cứu học thuật đã đề xuất những phương pháp tiếp cận đột phá. Đáng chú ý nhất là nghiên cứu của Feist et al. (Nguồn 4) khi đưa ra khái niệm phân tích{" "}
          <Term color="#4A7C59" tooltip="Abstract Syntax Tree — Cây cú pháp trừu tượng">
            AST
          </Term>
          .
        </Lede>

        <Callout
          label="KEY CONCEPT"
          title="AST — Abstract Syntax Tree"
          color="#4A7C59"
          body="Cây cú pháp trừu tượng biểu diễn cấu trúc cú pháp của mã nguồn dưới dạng cây có thứ tự. Thay vì đánh giá lịch sử phần mềm qua các chỉ số nông như 'số dòng code thêm/xóa' (LOC), việc trực quan hóa AST cho phép hệ thống hiểu được bản chất của sự thay đổi."
        />

        <P>
          Ví dụ: việc sửa tên một biến trên 200 dòng sẽ được hiển thị khác hoàn toàn với việc viết lại thuật toán lõi của cả một hàm. Phương pháp này vượt trội so với cách đếm LOC truyền thống vốn coi cả hai thay đổi như nhau.
        </P>

        <PullQuote attribution="Feist et al., IEEE VISSOFT 2016">
          Phân tích AST cho phép hiểu được logic thực sự của mã nguồn — biến đổi
          cấu trúc (refactoring) và sửa lỗi (bug fix) không còn bị đánh đồng.
        </PullQuote>

        <P>
          Tiến xa hơn, Kim et al. trong công bố Githru (Nguồn 1) đã áp dụng thuật toán phân cụm. Họ sử dụng phương pháp "Context-Preserving Squash Merge" để gộp các commit nhỏ lẻ mang tính chất sửa lỗi lặt vặt (typos) thành các cụm tính năng lớn (features). Điều này giúp các nhà quản lý dự án nhìn thấy được "rừng" (tiến độ tổng thể) thay vì bị lạc trong "cây" (các commit siêu nhỏ), khắc phục hoàn toàn điểm yếu của các công cụ truyền thống.
        </P>
      </Subsection>

      <Transition to="TỪ NGHIÊN CỨU ĐẾN THỰC TIỄN CÔNG NGHIỆP" />

      {/* 4.3 */}
      <Subsection
        num="4.3"
        glyph="◈"
        title="Góc nhìn từ thực tiễn Công nghiệp và DevOps"
      >
        <Lede>
          Trong khi các tài liệu học thuật (Nguồn 1-6) tập trung vào tính đúng đắn của thuật toán, thì các Nguồn mở Internet (Nguồn 9, 10, 12) lại mang đến góc nhìn sống động về hiệu năng trong thực tế.
        </Lede>

        <Callout
          label="THỰC TIỄN"
          title="OpenTelemetry trong Git"
          color="#E8701A"
          body="Đội ngũ kỹ sư của GitHub (Nguồn 9, 10) nhấn mạnh rằng việc truy xuất hàng triệu nốt DAG trong thời gian thực là bất khả thi nếu không có kỹ thuật bộ nhớ đệm (caching) và đo lường từ xa (OpenTelemetry)."
        />

        <P>
          Stolee (Nguồn 9) đã giải phẫu chi tiết cách GitHub sử dụng commit-graph file và generation numbers để tăng tốc truy vấn lịch sử commit. Đây là kiến thức thực chiến quý giá mà các bài báo học thuật thường bỏ qua.
        </P>

        <PullQuote attribution="Stolee, 2022 — GitHub Engineering Blog">
          Việc truy xuất hàng triệu nốt DAG trong thời gian thực đòi hỏi
          kiến trúc caching tinh vi — đây là bài toán kỹ thuật mà lý thuyết
          đồ thị thuần túy không thể giải quyết.
        </PullQuote>

        <P>
          Đồng thời, hướng dẫn thực hành của Feststelltaste (Nguồn 12) chứng minh rằng sinh viên Công nghệ Thông tin hoàn toàn có thể tự xây dựng các công cụ phân tích nhỏ gọn bằng Python (Pandas) để xử lý dữ liệu thô từ Git log, tạo ra các Stream Graphs phục vụ nhu cầu nội bộ của team. Điều này cho thấy khoảng cách giữa nghiên cứu và thực hành đang dần được thu hẹp.
        </P>
      </Subsection>
    </section>
  );
}
