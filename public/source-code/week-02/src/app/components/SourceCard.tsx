import { Source, typeMeta } from "./data";

const mono = { fontFamily: "JetBrains Mono, monospace" as const };

export function SourceCard({ source }: { source: Source }) {
  const t = typeMeta[source.type];

  return (
    <article
      className="group relative grid gap-0"
      style={{
        gridTemplateColumns: "72px 1fr",
        background: "#141414",
        borderLeft: `3px solid ${t.color}`,
        transition: "background 0.3s",
      }}
    >
      {/* Index gutter */}
      <div
        className="flex flex-col items-center justify-between"
        style={{
          padding: "24px 0",
          borderRight: "1px solid #1F1F1F",
          background: t.tint,
        }}
      >
        <div>
          <div
            style={{
              ...mono,
              fontSize: 10,
              color: "#6B6B6B",
              letterSpacing: 1.5,
              textAlign: "center",
            }}
          >
            NO.
          </div>
          <div
            style={{
              ...mono,
              fontWeight: 700,
              fontSize: 32,
              color: "#E0DDD5",
              lineHeight: 1,
              marginTop: 4,
            }}
          >
            {String(source.index).padStart(2, "0")}
          </div>
        </div>
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            ...mono,
            fontSize: 9,
            letterSpacing: 2,
            color: t.color,
          }}
        >
          {t.label}
        </div>
        <div
          style={{
            ...mono,
            fontSize: 10,
            color: "#6B6B6B",
            letterSpacing: 1,
          }}
        >
          '{String(source.year).slice(2)}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px" }}>
        {/* Header chips */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span
            style={{
              ...mono,
              fontSize: 10,
              letterSpacing: 1.5,
              color: t.color,
              border: `1px solid ${t.color}`,
              padding: "3px 8px",
            }}
          >
            {t.label}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 10,
              color: "#6B6B6B",
              letterSpacing: 1,
              padding: "3px 8px",
              background: "#1F1F1F",
            }}
          >
            {source.year}
          </span>
          <span
            style={{
              ...mono,
              fontSize: 10,
              color: "#9C9890",
              letterSpacing: 1,
              padding: "3px 8px",
              background: "#1F1F1F",
            }}
            title="Citations"
          >
            ⌖ {source.citations.toLocaleString()} CIT
          </span>
          {source.doi && (
            <span
              style={{
                ...mono,
                fontSize: 10,
                color: "#6B6B6B",
                letterSpacing: 0.5,
                marginLeft: "auto",
              }}
            >
              doi:{source.doi}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            ...mono,
            fontWeight: 700,
            color: "#E0DDD5",
            lineHeight: 1.25,
            marginBottom: 10,
          }}
        >
          {source.title}
        </h3>

        {/* Authors + publisher */}
        <div className="mb-5" style={{ borderBottom: "1px solid #1F1F1F", paddingBottom: 14 }}>
          <div style={{ color: "#D6D3CA", fontSize: 13, marginBottom: 4 }}>
            {source.authors}
          </div>
          <div style={{ ...mono, fontSize: 12, color: "#8A8A8A" }}>
            ▸ {source.publisher}
          </div>
        </div>

        {/* Method */}
        <div className="mb-5">
          <div
            style={{
              ...mono,
              fontSize: 10,
              color: "#6B6B6B",
              letterSpacing: 1.5,
              marginBottom: 6,
            }}
          >
            METHODOLOGY
          </div>
          <p style={{ color: "#B8B5AC", fontSize: 13, lineHeight: 1.6 }}>
            {source.method}
          </p>
        </div>

        {/* Pros / Cons two-column */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            background: "#0F0F0F",
            padding: 14,
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: 10,
                color: "#4A7C59",
                letterSpacing: 1.5,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 1,
                  background: "#4A7C59",
                }}
              />
              ƯU ĐIỂM
            </div>
            <ul className="space-y-1.5">
              {source.pros.map((p, i) => (
                <li
                  key={i}
                  style={{
                    color: "#D6D3CA",
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    paddingLeft: 14,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "#4A7C59",
                      ...mono,
                    }}
                  >
                    +
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div
              style={{
                ...mono,
                fontSize: 10,
                color: "#E8701A",
                letterSpacing: 1.5,
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 1,
                  background: "#E8701A",
                }}
              />
              HẠN CHẾ
            </div>
            <ul className="space-y-1.5">
              {source.cons.map((c, i) => (
                <li
                  key={i}
                  style={{
                    color: "#D6D3CA",
                    fontSize: 12.5,
                    lineHeight: 1.5,
                    paddingLeft: 14,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      color: "#E8701A",
                      ...mono,
                    }}
                  >
                    −
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
