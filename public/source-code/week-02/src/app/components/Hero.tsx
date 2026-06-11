import { DAGHero, nodes as dagNodes, edges as dagEdges } from "./DAGHero";
import { useEffect, useMemo, useRef, useState } from "react";

const mono = { fontFamily: "JetBrains Mono, monospace" as const };

function Tick({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ ...mono, fontSize: 9, color: "#6B6B6B", letterSpacing: 1.8, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ ...mono, fontSize: 13, color: "#E0DDD5", fontWeight: 500 }}>
        {value}
      </div>
    </div>
  );
}

/** Convert a decimal degree to DMS string, e.g. 21.03472 → 21°02'05" */
function toDMS(deg: number): string {
  const d = Math.floor(Math.abs(deg));
  const mf = (Math.abs(deg) - d) * 60;
  const m = Math.floor(mf);
  const s = Math.floor((mf - m) * 60);
  return `${String(d).padStart(2, "0")}°${String(m).padStart(2, "0")}'${String(s).padStart(2, "0")}"`;
}

function useMouseCoords() {
  // VJU campus center: 21°02'05" N, 105°50'12" E
  const baseLat = 21.0347;
  const baseLng = 105.8367;
  const [lat, setLat] = useState(baseLat);
  const [lng, setLng] = useState(baseLng);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;   // 0..1
      const ny = e.clientY / window.innerHeight;  // 0..1
      // ±0.03° range around VJU (~3km)
      setLat(baseLat + (0.5 - ny) * 0.06);
      setLng(baseLng + (nx - 0.5) * 0.06);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return { lat, lng };
}

export function Hero() {
  const { lat, lng } = useMouseCoords();

  // Compute DAG depth (longest path in edges) via BFS
  const dagDepth = useMemo(() => {
    const adj: Record<string, string[]> = {};
    for (const [from, to] of dagEdges) {
      (adj[from] ??= []).push(to);
    }
    let maxD = 0;
    const stack: [string, number][] = dagNodes
      .filter((n) => !dagEdges.some(([, to]) => to === n.id))
      .map((n) => [n.id, 0]);
    if (stack.length === 0 && dagNodes.length > 0) stack.push([dagNodes[0].id, 0]);
    while (stack.length) {
      const [id, d] = stack.pop()!;
      if (d > maxD) maxD = d;
      for (const next of adj[id] ?? []) stack.push([next, d + 1]);
    }
    return maxD;
  }, []);

  // Measure actual component render time
  const t0 = useRef(performance.now());
  const [renderMs, setRenderMs] = useState(0);
  useEffect(() => {
    setRenderMs(performance.now() - t0.current);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        background: "#0D0D0D",
        borderBottom: "1px solid #1A1A1A",
        overflow: "hidden",
      }}
    >
      {/* Crosshair / measurement marks */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(#141414 1px, transparent 1px), linear-gradient(90deg, #141414 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 28,
          borderBottom: "1px solid #1A1A1A",
          display: "flex",
          alignItems: "center",
          paddingLeft: 24,
          gap: 32,
          ...mono,
          fontSize: 10,
          color: "#5A5A5A",
          letterSpacing: 1.5,
        }}
      >
        <span>⊕ N {toDMS(lat)}</span>
        <span>⊕ E {toDMS(lng)}</span>
        <span style={{ color: "#E8701A" }}>● TX 2026 / SEMESTER-02</span>
        <span style={{ marginLeft: "auto", paddingRight: 24 }}>RPT-VJU/25112107</span>
      </div>

      <div style={{ position: "relative", padding: "84px 80px 64px" }}>
        {/* Institution masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            borderBottom: "1px solid #2A2A2A",
            paddingBottom: 20,
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: "#E8701A",
                letterSpacing: 3,
                marginBottom: 8,
              }}
            >
              ĐẠI HỌC QUỐC GIA HÀ NỘI
            </div>
            <div
              style={{
                ...mono,
                fontWeight: 700,
                fontSize: 14,
                color: "#E0DDD5",
                letterSpacing: 2.5,
              }}
            >
              TRƯỜNG ĐẠI HỌC VIỆT NHẬT — VJU
            </div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: "#6B6B6B",
                letterSpacing: 2,
                marginTop: 6,
              }}
            >
              VIETNAM JAPAN UNIVERSITY · 日越大学
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            <Tick label="DOCUMENT" value="RPT-2026-052" />
            <Tick label="CLASSIFICATION" value="ACADEMIC / OPEN" />
            <Tick label="PAGES" value="01 / 01" />
          </div>
        </div>

        {/* Brutalist stacked title */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 520px", gap: 48 }}>
          <div>
            <div
              style={{
                ...mono,
                fontSize: 11,
                color: "#6B6B6B",
                letterSpacing: 2.5,
                marginBottom: 24,
              }}
            >
              // BÁO CÁO BÀI TẬP · ĐÁNH GIÁ NGUỒN THÔNG TIN HỌC THUẬT
            </div>

            <h1
              style={{
                ...mono,
                fontWeight: 700,
                color: "#E0DDD5",
                letterSpacing: -1,
                lineHeight: 0.92,
                margin: 0,
              }}
            >
              <span style={{ display: "block", fontSize: 96 }}>GIT</span>
              <span
                style={{
                  display: "block",
                  fontSize: 56,
                  color: "#E8701A",
                  marginTop: 4,
                }}
              >
                ⎯⎯⎯ DAG ⎯⎯⎯
              </span>
              <span style={{ display: "block", fontSize: 56, marginTop: 4 }}>
                VISUAL—
              </span>
              <span style={{ display: "block", fontSize: 56, marginTop: 4 }}>
                IZATION
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: 22,
                  color: "#9C9890",
                  fontWeight: 400,
                  marginTop: 24,
                  letterSpacing: 0,
                  lineHeight: 1.3,
                  maxWidth: 520,
                  fontFamily:
                    "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                Phương pháp trực quan hóa cấu trúc dữ liệu DAG và Lịch sử
                tiến hóa phần mềm trong Git.
              </span>
            </h1>

            {/* Abstract */}
            <div
              style={{
                marginTop: 40,
                paddingLeft: 24,
                borderLeft: "2px solid #E8701A",
                maxWidth: 560,
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "#E8701A",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                TÓM TẮT
              </div>
              <p style={{ color: "#D6D3CA", lineHeight: 1.7, fontSize: 15 }}>
                Báo cáo thu thập, phân tích và đánh giá 13 nguồn tài liệu uy tín
                thuộc 5 phân loại (tạp chí khoa học, hội nghị, sách chuyên khảo,
                blog kỹ thuật và tài liệu gốc) về phương pháp trực quan hóa
                cấu trúc dữ liệu DAG và lịch sử tiến hóa phần mềm trong Git.
              </p>
            </div>
          </div>

          {/* Right panel: DAG fig + student card */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: "#0A0A0A",
                border: "1px solid #1F1F1F",
                padding: 14,
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "#6B6B6B",
                  letterSpacing: 1.5,
                  marginBottom: 10,
                }}
              >
                <span>▸ FIG.00 · COMMIT-DAG TOPOLOGY</span>
                <span style={{ color: "#4A7C59" }}>● LIVE</span>
              </div>
              <DAGHero />
              <div
                className="flex items-center justify-between"
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "#6B6B6B",
                  marginTop: 6,
                }}
              >
                <span>{dagNodes.length} nodes · {dagEdges.length} edges · depth {dagDepth}</span>
                <span>render {renderMs.toFixed(1)}ms</span>
              </div>
            </div>

            {/* Student identification card */}
            <div
              style={{
                background: "#141414",
                borderLeft: "3px solid #E8701A",
                padding: 20,
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: 10,
                  color: "#6B6B6B",
                  letterSpacing: 2,
                  marginBottom: 14,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>// PRINCIPAL INVESTIGATOR</span>
                <span style={{ color: "#4A7C59" }}>VERIFIED ✓</span>
              </div>
              <div
                style={{
                  ...mono,
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#E0DDD5",
                  letterSpacing: 0.5,
                }}
              >
                NGUYỄN TUẤN THÀNH
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid #1F1F1F",
                }}
              >
                <Tick label="MSSV" value="25112107" />
                <Tick label="NIÊN KHOÁ" value="2025—2029" />
                <Tick label="CHUYÊN NGÀNH" value="KH & KT Máy tính" />
                <Tick label="KHOA" value="Công nghệ thông tin" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 64,
            paddingTop: 18,
            borderTop: "1px solid #1A1A1A",
            ...mono,
            fontSize: 10,
            color: "#6B6B6B",
            letterSpacing: 1.5,
          }}
        >
          <span>▸ 13 NGUỒN · 05 LOẠI TÀI LIỆU · 05 TIÊU CHÍ ĐÁNH GIÁ</span>
          <span>↓ CUỘN ĐỂ TIẾP TỤC</span>
          <span>REV 2.1.3 / 2026-Q2</span>
        </div>
      </div>
    </section>
  );
}
