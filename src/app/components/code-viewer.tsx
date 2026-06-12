import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  X,
  Copy,
  Check,
  Search,
  ChevronRight,
  ChevronDown,
  Terminal,
  ExternalLink,
  Code,
  FileImage
} from "lucide-react";

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
}

export const projectFilesMap: Record<string, FileNode[]> = {
  "portfolio": [
    { name: "index.html", path: "index.html", type: "file" },
    { name: "package.json", path: "package.json", type: "file" },
    { name: "vite.config.ts", path: "vite.config.ts", type: "file" },
    { name: "tsconfig.json", path: "tsconfig.json", type: "file" },
    { name: "postcss.config.mjs", path: "postcss.config.mjs", type: "file" },
    {
      name: "src",
      path: "src",
      type: "directory",
      children: [
        { name: "main.tsx", path: "src/main.tsx", type: "file" },
        {
          name: "app",
          path: "src/app",
          type: "directory",
          children: [
            { name: "App.tsx", path: "src/app/App.tsx", type: "file" },
            {
              name: "components",
              path: "src/app/components",
              type: "directory",
              children: [
                { name: "case-study.tsx", path: "src/app/components/case-study.tsx", type: "file" },
                { name: "code-viewer.tsx", path: "src/app/components/code-viewer.tsx", type: "file" },
                { name: "command-palette.tsx", path: "src/app/components/command-palette.tsx", type: "file" },
                { name: "grain.tsx", path: "src/app/components/grain.tsx", type: "file" },
                { name: "magnetic.tsx", path: "src/app/components/magnetic.tsx", type: "file" },
                { name: "marquee.tsx", path: "src/app/components/marquee.tsx", type: "file" },
                { name: "reveal.tsx", path: "src/app/components/reveal.tsx", type: "file" },
                { name: "theme-toggle.tsx", path: "src/app/components/theme-toggle.tsx", type: "file" },
                { name: "use-theme.ts", path: "src/app/components/use-theme.ts", type: "file" },
                {
                  name: "media",
                  path: "src/app/components/media",
                  type: "directory",
                  children: [
                    { name: "ImageWithFallback.tsx", path: "src/app/components/media/ImageWithFallback.tsx", type: "file" }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "assets",
          path: "src/assets",
          type: "directory",
          children: [
            { name: "avatar-dark.png", path: "src/assets/avatar-dark.png", type: "file" },
            { name: "avatar-light.png", path: "src/assets/avatar-light.png", type: "file" },
            {
              name: "evidence",
              path: "src/assets/evidence",
              type: "directory",
              children: [
                { name: "bonus.png", path: "src/assets/evidence/bonus.png", type: "file" },
                { name: "week-01.png", path: "src/assets/evidence/week-01.png", type: "file" },
                { name: "week-02.png", path: "src/assets/evidence/week-02.png", type: "file" },
                { name: "week-03.png", path: "src/assets/evidence/week-03.png", type: "file" },
                { name: "week-04.png", path: "src/assets/evidence/week-04.png", type: "file" },
                { name: "week-05.png", path: "src/assets/evidence/week-05.png", type: "file" },
                { name: "week-06.png", path: "src/assets/evidence/week-06.png", type: "file" }
              ]
            }
          ]
        },
        {
          name: "styles",
          path: "src/styles",
          type: "directory",
          children: [
            { name: "globals.css", path: "src/styles/globals.css", type: "file" },
            { name: "index.css", path: "src/styles/index.css", type: "file" },
            { name: "tailwind.css", path: "src/styles/tailwind.css", type: "file" },
            { name: "theme.css", path: "src/styles/theme.css", type: "file" }
          ]
        }
      ]
    }
  ]
};

const getProjectTitle = (slug: string): string => {
  switch (slug) {
    case "week-01": return "Week 01 - Thao tác Windows";
    case "week-02": return "Week 02 - Đánh giá nguồn thông tin";
    case "week-03": return "Week 03 - Prompt Engineering";
    case "week-04": return "Week 04 - Công cụ hợp tác trực tuyến";
    case "week-05": return "Week 05 - AI × Sáng tạo nội dung số";
    case "week-06": return "Week 06 - AI trong học thuật";
    case "bonus": return "Báo cáo so sánh AI (Bonus)";
    case "portfolio": return "Portfolio Nguyễn Tuấn Thành";
    default: return "Source Code";
  }
};

const getFileLanguage = (fileName: string): string => {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "html") return "markup";
  if (ext === "css") return "css";
  if (ext === "js") return "javascript";
  if (ext === "ts" || ext === "tsx") return "typescript";
  if (ext === "json") return "json";
  if (ext === "md") return "markdown";
  return "text";
};

const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

const loadPrismAssets = async (): Promise<any> => {
  if ((window as any).Prism) return (window as any).Prism;

  const cssUrl = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
  if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssUrl;
    document.head.appendChild(link);
  }

  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js");

  const languages = ["markup", "css", "javascript", "typescript", "jsx", "tsx", "markdown"];
  for (const lang of languages) {
    const langUrl = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
    try {
      await loadScript(langUrl);
    } catch (e) {
      console.warn(`Prism failed to load language: ${lang}`, e);
    }
  }

  return (window as any).Prism;
};

export function CodeExplorer({
  projectSlug,
  onClose
}: {
  projectSlug: string;
  onClose: () => void;
}) {
  const files = projectFilesMap[projectSlug] || [];
  
  // Find first file recursively to open it initially
  const findFirstFile = (nodes: FileNode[]): string => {
    for (const node of nodes) {
      if (node.type === "file") return node.path;
      if (node.type === "directory" && node.children) {
        const found = findFirstFile(node.children);
        if (found) return found;
      }
    }
    return "";
  };

  const initialFilePath = findFirstFile(files);

  const [activeFile, setActiveFile] = useState<string>(initialFilePath);
  const [openTabs, setOpenTabs] = useState<string[]>(initialFilePath ? [initialFilePath] : []);
  const [fileContent, setFileContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [expandedDirs, setExpandedDirs] = useState<Record<string, boolean>>({
    "src": true,
    "src/app": true,
    "src/app/components": true
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const codeRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load file content
  useEffect(() => {
    if (!activeFile) return;

    const activeFileName = activeFile.split("/").pop() || "";
    const isImage = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(activeFileName.split(".").pop()?.toLowerCase() || "");
    
    if (isImage) {
      setFileContent("");
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchFile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = import.meta.env.BASE_URL || "/";
        const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
        const fileUrl = `${cleanBaseUrl}source-code/${projectSlug}/${activeFile}`;
        
        const res = await fetch(fileUrl);
        if (!res.ok) throw new Error(`Status ${res.status}: Không thể tải tệp`);
        const text = await res.text();
        setFileContent(text);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Đã xảy ra lỗi khi tải tệp.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFile();
  }, [activeFile, projectSlug]);

  // Handle syntax highlighting when content or Prism loads
  useEffect(() => {
    if (isLoading || error || !fileContent) return;

    let mounted = true;
    loadPrismAssets().then((prism) => {
      if (mounted && prism && codeRef.current) {
        prism.highlightElement(codeRef.current);
      }
    });

    return () => {
      mounted = false;
    };
  }, [fileContent, activeFile, isLoading, error]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectFile = (path: string) => {
    setActiveFile(path);
    if (!openTabs.includes(path)) {
      setOpenTabs([...openTabs, path]);
    }
  };

  const handleCloseTab = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter((t) => t !== path);
    setOpenTabs(newTabs);

    if (activeFile === path) {
      if (newTabs.length > 0) {
        setActiveFile(newTabs[newTabs.length - 1]);
      } else {
        setActiveFile("");
      }
    }
  };

  const toggleDirectory = (path: string) => {
    setExpandedDirs((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const activeFileName = activeFile.split("/").pop() || "";
  const activeLanguage = getFileLanguage(activeFileName);
  const lines = fileContent ? fileContent.split("\n") : [];

  // Render file explorer items recursively
  const renderExplorerNodes = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => {
      const isExpanded = expandedDirs[node.path];
      const isSelected = activeFile === node.path;

      if (node.type === "directory") {
        return (
          <div key={node.path} className="w-full">
            <button
              onClick={() => toggleDirectory(node.path)}
              className="flex w-full items-center gap-1.5 py-1.5 hover:bg-white/5 px-2 text-stone-300 transition-colors text-xs font-mono"
              style={{ paddingLeft: `${depth * 12 + 8}px` }}
            >
              <span className="shrink-0 text-stone-500">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </span>
              <span className="shrink-0 text-[#ffb829] dark:text-[#ffb829]">
                {isExpanded ? <FolderOpen size={15} /> : <Folder size={15} />}
              </span>
              <span className="truncate">{node.name}</span>
            </button>
            {isExpanded && node.children && (
              <div className="w-full">
                {renderExplorerNodes(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }

      // File node
      const ext = node.name.split(".").pop()?.toLowerCase() || "";
      const isImg = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext);
      let iconColor = "text-stone-400";
      if (ext === "html") iconColor = "text-orange-500";
      else if (ext === "css") iconColor = "text-blue-400";
      else if (ext === "js") iconColor = "text-yellow-400";
      else if (ext === "ts" || ext === "tsx") iconColor = "text-sky-400";
      else if (ext === "json") iconColor = "text-emerald-400";
      else if (isImg) iconColor = "text-purple-400";

      return (
        <button
          key={node.path}
          onClick={() => handleSelectFile(node.path)}
          className={`flex w-full items-center gap-2 py-1.5 px-2 hover:bg-white/5 transition-colors text-xs font-mono ${
            isSelected ? "bg-[#ffb829]/10 text-white font-medium border-l-2 border-[#ffb829]" : "text-stone-400"
          }`}
          style={{ paddingLeft: `${depth * 12 + 22}px` }}
        >
          <span className={`shrink-0 ${iconColor}`}>
            {isImg ? <FileImage size={14} /> : ext === "html" ? <Code size={14} /> : <FileCode size={14} />}
          </span>
          <span className="truncate">{node.name}</span>
        </button>
      );
    });
  };

  // Safe file size calculation
  const getFileSizeString = () => {
    const bytes = new Blob([fileContent]).size;
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 md:p-6 backdrop-blur-md"
      ref={containerRef}
    >
      <motion.div
        initial={{ y: 20, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="relative flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-stone-900 bg-[#0c0f16] text-[#c9d1d9] shadow-[10px_10px_0_0_#1c140d] dark:border-white/10 dark:shadow-[10px_10px_0_0_#ffb829]"
      >
        {/* Title bar */}
        <div className="flex h-12 items-center justify-between border-b border-stone-900 bg-[#080b10] px-4">
          <div className="flex items-center gap-3">
            <span className="grid h-7 w-7 place-items-center rounded bg-[#ffb829]/10 text-[#ffb829]">
              <Terminal size={14} />
            </span>
            <span className="font-mono text-sm font-semibold tracking-wide text-white">
              {getProjectTitle(projectSlug)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Input */}
            {activeFile && !isLoading && !error && (
              <div className="relative hidden items-center md:flex">
                <Search size={13} className="absolute left-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Tìm từ khóa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 w-48 rounded bg-stone-900 pl-8 pr-3 text-xs text-stone-200 outline-none border border-stone-800 focus:border-[#ffb829] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 text-stone-500 hover:text-stone-300"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            )}

            {/* Toggle Sidebar (Mobile) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="grid h-8 w-8 place-items-center rounded hover:bg-white/5 text-stone-400 md:hidden"
              title="Tải Explorer"
            >
              <Code size={16} />
            </button>

            {/* External Link */}
            {activeFile && (
              <a
                href={`${import.meta.env.BASE_URL || "/"}source-code/${projectSlug}/${activeFile}`}
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded hover:bg-white/5 text-stone-400 hover:text-white transition-colors"
                title="Mở tab mới"
              >
                <ExternalLink size={16} />
              </a>
            )}

            {/* Copy Button */}
            {activeFile && !isLoading && !error && (
              <button
                onClick={handleCopy}
                className="grid h-8 w-8 place-items-center rounded hover:bg-white/5 text-stone-400 hover:text-[#ffb829] transition-colors"
                title="Copy toàn bộ mã"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="grid h-8 w-8 place-items-center rounded hover:bg-[#e81123] text-stone-400 hover:text-white transition-colors"
              title="Đóng cửa sổ"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Main Body Layout */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* File Tree Sidebar */}
          <aside
            className={`absolute top-0 bottom-0 left-0 z-30 w-[240px] shrink-0 border-r border-stone-900 bg-[#080b10]/95 md:relative md:block md:bg-[#080b10] transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
          >
            <div className="flex h-8 items-center border-b border-stone-900 px-3 bg-[#080b10]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500">
                Explorer
              </span>
            </div>
            <div className="h-[calc(100%-32px)] overflow-y-auto py-2">
              {renderExplorerNodes(files)}
            </div>
          </aside>

          {/* Background Overlay for Mobile Sidebar */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 bg-black/40 z-20 md:hidden"
            />
          )}

          {/* Editor Area */}
          <main className="flex flex-1 flex-col overflow-hidden bg-[#0c0f16]">
            {/* Tabs bar */}
            {openTabs.length > 0 && (
              <div className="flex h-8 overflow-x-auto border-b border-stone-900 bg-[#080b10] select-none [&::-webkit-scrollbar]:hidden">
                {openTabs.map((path) => {
                  const name = path.split("/").pop() || "";
                  const isSelected = activeFile === path;
                  const ext = name.split(".").pop()?.toLowerCase() || "";
                  const isImg = ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext);
                  let iconColor = "text-stone-400";
                  if (ext === "html") iconColor = "text-orange-500";
                  else if (ext === "css") iconColor = "text-blue-400";
                  else if (ext === "js") iconColor = "text-yellow-400";
                  else if (ext === "ts" || ext === "tsx") iconColor = "text-sky-400";
                  else if (isImg) iconColor = "text-purple-400";

                  return (
                    <div
                      key={path}
                      onClick={() => handleSelectFile(path)}
                      className={`group flex h-full items-center gap-2 border-r border-stone-900 px-3.5 text-xs font-mono transition-colors cursor-pointer select-none ${
                        isSelected
                          ? "bg-[#0c0f16] text-[#ffb829] font-medium border-t border-t-[#ffb829]"
                          : "bg-[#080b10]/70 text-stone-500 hover:text-stone-300"
                      }`}
                    >
                      <span className={`shrink-0 ${iconColor}`}>
                        {isImg ? <FileImage size={12} /> : ext === "html" ? <Code size={12} /> : <FileCode size={12} />}
                      </span>
                      <span>{name}</span>
                      <button
                        onClick={(e) => handleCloseTab(path, e)}
                        className="rounded p-0.5 opacity-0 hover:bg-white/10 group-hover:opacity-100 hover:text-white"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Code Content */}
            <div className="flex-1 overflow-auto p-4 font-mono relative leading-relaxed">
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-700 border-t-[#ffb829]" />
                  <p className="font-mono text-xs text-stone-500">Đang tải mã nguồn...</p>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
                  <span className="text-red-500">⚠️</span>
                  <p className="text-sm font-semibold text-stone-300">{error}</p>
                  <button
                    onClick={() => setActiveFile(activeFile)}
                    className="rounded-full bg-[#ffb829] px-4 py-1.5 text-xs text-black font-semibold hover:scale-105 transition-transform"
                  >
                    Thử lại
                  </button>
                </div>
              ) : activeFile && ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(activeFile.split(".").pop()?.toLowerCase() || "") ? (
                <div className="absolute inset-0 flex items-center justify-center p-6 bg-stone-900/10 overflow-auto">
                  <div className="max-w-full max-h-full flex flex-col items-center gap-4 bg-[#080b10]/95 p-6 rounded-2xl border border-stone-900 shadow-2xl">
                    <div className="overflow-auto max-w-[80vw] max-h-[60vh] border border-stone-950 rounded bg-[#151b26]/50">
                      <img
                        src={`${import.meta.env.BASE_URL || "/"}source-code/${projectSlug}/${activeFile}`}
                        alt={activeFile.split("/").pop() || ""}
                        className="object-contain max-h-[50vh] rounded"
                        style={{
                          backgroundImage: "linear-gradient(45deg, #151b26 25%, transparent 25%), linear-gradient(-45deg, #151b26 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #151b26 75%), linear-gradient(-45deg, transparent 75%, #151b26 75%)",
                          backgroundSize: "16px 16px",
                          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px"
                        }}
                      />
                    </div>
                    <div className="font-mono text-[11px] text-stone-500 flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
                      <span>Tên tệp: {activeFile.split("/").pop()}</span>
                      <span>Đường dẫn: /{activeFile}</span>
                    </div>
                  </div>
                </div>
              ) : activeFile && fileContent ? (
                <div className="flex w-full min-h-full">
                  {/* Line Numbers */}
                  <div className="select-none text-right pr-4 text-stone-600 font-mono text-xs border-r border-stone-900 mr-4 shrink-0">
                    {lines.map((_, i) => (
                      <div key={i} className="leading-5 h-5">
                        {i + 1}
                      </div>
                    ))}
                  </div>

                  {/* Code Container */}
                  <div className="flex-1 overflow-x-auto">
                    <pre className="m-0 p-0 overflow-visible bg-transparent leading-5" style={{ margin: 0, padding: 0 }}>
                      <code
                        ref={codeRef}
                        className={`language-${activeLanguage} text-xs leading-5 block w-full whitespace-pre`}
                      >
                        {fileContent}
                      </code>
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-stone-900 text-stone-500">
                    <Terminal size={22} />
                  </span>
                  <p className="font-mono text-xs text-stone-500">Chọn một tệp từ Explorer để xem mã nguồn.</p>
                </div>
              )}
            </div>

            {/* Status bar */}
            {activeFile && !isLoading && !error && (
              <div className="flex h-6 items-center justify-between border-t border-stone-900 bg-[#080b10] px-4 font-mono text-[10px] text-stone-500 select-none">
                <div className="flex items-center gap-4">
                  <span>Language: {activeLanguage.toUpperCase()}</span>
                  <span>Size: {getFileSizeString()}</span>
                  <span>Lines: {lines.length}</span>
                </div>
                <div>
                  <span>UTF-8</span>
                </div>
              </div>
            )}
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
}
