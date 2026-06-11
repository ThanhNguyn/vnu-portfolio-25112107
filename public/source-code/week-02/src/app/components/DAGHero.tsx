import { motion } from "motion/react";

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  branch: "main" | "feature" | "hotfix";
}

export const nodes: Node[] = [
  { id: "a", x: 60, y: 180, label: "a1f3", branch: "main" },
  { id: "b", x: 160, y: 180, label: "9c2e", branch: "main" },
  { id: "c", x: 260, y: 180, label: "4d77", branch: "main" },
  { id: "d", x: 360, y: 120, label: "8b21", branch: "feature" },
  { id: "e", x: 460, y: 120, label: "2fa9", branch: "feature" },
  { id: "f", x: 360, y: 240, label: "7e0c", branch: "hotfix" },
  { id: "g", x: 460, y: 240, label: "11dd", branch: "hotfix" },
  { id: "h", x: 560, y: 180, label: "c3b5", branch: "main" },
  { id: "i", x: 660, y: 180, label: "HEAD", branch: "main" },
];

export const edges: [string, string][] = [
  ["a", "b"],
  ["b", "c"],
  ["c", "d"],
  ["d", "e"],
  ["c", "f"],
  ["f", "g"],
  ["e", "h"],
  ["g", "h"],
  ["h", "i"],
];

const branchColor: Record<string, string> = {
  main: "#E0DDD5",
  feature: "#E8701A",
  hotfix: "#4A7C59",
};

export function DAGHero() {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <svg
      viewBox="0 0 720 360"
      className="w-full h-auto"
      style={{ maxHeight: 360 }}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="720" height="360" fill="url(#grid)" />

      {/* Crosshair markings */}
      <g stroke="#2A2A2A" strokeWidth="0.5">
        <line x1="0" y1="180" x2="720" y2="180" />
      </g>

      {edges.map(([from, to], i) => {
        const a = nodeMap[from];
        const b = nodeMap[to];
        const color =
          branchColor[b.branch === "main" ? a.branch : b.branch] ?? "#E0DDD5";
        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
          />
        );
      })}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={n.id === "i" ? 10 : 7}
            fill="#0D0D0D"
            stroke={branchColor[n.branch]}
            strokeWidth="2"
          />
          {n.id === "i" && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r="14"
              fill="none"
              stroke="#E8701A"
              strokeWidth="1"
              animate={{ r: [10, 22], opacity: [0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          <text
            x={n.x}
            y={n.y + (n.branch === "feature" ? -16 : 22)}
            fill="#6B6B6B"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            textAnchor="middle"
          >
            {n.label}
          </text>
        </motion.g>
      ))}

      {/* branch labels */}
      <text x="10" y="120" fill="#E8701A" fontSize="9" fontFamily="JetBrains Mono, monospace">
        ┌ feature/ast-diff
      </text>
      <text x="10" y="200" fill="#E0DDD5" fontSize="9" fontFamily="JetBrains Mono, monospace">
        ├ main
      </text>
      <text x="10" y="260" fill="#4A7C59" fontSize="9" fontFamily="JetBrains Mono, monospace">
        └ hotfix/2.1.3
      </text>
    </svg>
  );
}
