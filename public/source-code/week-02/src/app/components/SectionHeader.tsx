export function SectionHeader({
  roman,
  title,
  subtitle,
}: {
  roman: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div
      className="flex items-end gap-8 mb-12"
      style={{ borderBottom: "1px solid #2A2A2A", paddingBottom: 16 }}
    >
      <div
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: 700,
          fontSize: 88,
          lineHeight: 0.9,
          color: "#E8701A",
        }}
      >
        {roman}
      </div>
      <div className="flex-1 pb-3">
        <div
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "#6B6B6B",
            letterSpacing: 2,
            marginBottom: 6,
          }}
        >
          // SECTION
        </div>
        <h2
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontWeight: 700,
            color: "#E0DDD5",
            letterSpacing: 1,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: "#9C9890", marginTop: 8, fontSize: 14 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
