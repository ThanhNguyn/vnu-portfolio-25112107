export type SourceType = "journal" | "conference" | "book" | "blog" | "official";

export interface Source {
  id: string;
  index: number;
  title: string;
  authors: string;
  publisher: string;
  year: number;
  type: SourceType;
  doi?: string;
  method: string;
  citations: number;
  pros: string[];
  cons: string[];
}

export const sources: Source[] = [
  {
    id: "s01",
    index: 1,
    title: "Githru: Visual Analytics for Understanding Software Development History Through Git Metadata Analysis",
    authors: "Youngtaek Kim, Jaeyoung Kim, Hyunjoo Jeon, Young-Ho Kim, Hyeon Song",
    publisher: "IEEE Transactions on Visualization and Computer Graphics (TVCG)",
    year: 2020,
    type: "journal",
    doi: "10.1109/TVCG.2020.3030414",
    method:
      "Thực nghiệm thuật toán phân cụm (clustering) và gộp ngữ cảnh (Context-Preserving Squash Merge); kiểm chứng trên 12 lập trình viên.",
    citations: 33,
    pros: [
      "Đăng trên tạp chí Q1, kiểm chứng khắt khe",
      "Thuật toán gộp commit thông minh, nhìn được \"rừng\" thay vì \"cây\"",
      "Dataset thực tế từ các dự án OSS lớn",
    ],
    cons: [
      "Thuật toán nặng về tính toán (computation-heavy)",
      "Khó triển khai real-time với repo lớn",
    ],
  },
  {
    id: "s02",
    index: 2,
    title: "GitTruck@Duck — Interactive Time Range Selection in Hierarchy-Oriented Polymetric Visualization",
    authors: "Adrian Hoff, Tobias Kilbak, Leonel Merino, Mircea Lungu",
    publisher: "IEEE International Conference on Software Maintenance and Evolution (ICSME)",
    year: 2024,
    type: "conference",
    doi: "10.1109/ICSME.2024.00042",
    method:
      "Phát triển công cụ Web-based, tập trung vào metric theo thời gian động; mở rộng từ Git-Truck gốc.",
    citations: 1,
    pros: [
      "Giao diện UI/UX rất hiện đại",
      "Tính năng lọc thời gian cực tốt",
      "Có demo trực tuyến sẵn",
    ],
    cons: [
      "Tính kiểm chứng chưa cao (ít trích dẫn do mới phát hành)",
      "Chưa hỗ trợ repo monorepo phức tạp",
    ],
  },
  {
    id: "s03",
    index: 3,
    title: "Git-Truck: Hierarchy-Oriented Visualization of Git Repository Evolution",
    authors: "Kristian Højelse, Tobias Kilbak, Jens Rossum, Emil Jäpelt, Leonel Merino",
    publisher: "IEEE Working Conference on Software Visualization (VISSOFT)",
    year: 2022,
    type: "conference",
    doi: "10.1109/VISSOFT55257.2022.00015",
    method:
      "Trực quan hóa cấu trúc phân cấp (Hierarchy) bằng treemap; đo lường sự đóng góp nhóm qua polymetric view.",
    citations: 13,
    pros: [
      "Giải quyết tốt bài toán quản lý team trong mô hình Agile",
      "Giao diện trực quan dạng treemap hiệu quả",
    ],
    cons: [
      "Mới dừng ở mức đánh giá sơ bộ (preliminary evaluation)",
      "Chưa tối ưu cho repo > 50k commit",
    ],
  },
  {
    id: "s04",
    index: 4,
    title: "Visualizing Project Evolution through Abstract Syntax Tree Analysis",
    authors: "Michael D. Feist, Eddie Santos, Ian Watts, Abram Hindle",
    publisher: "IEEE Working Conference on Software Visualization (VISSOFT)",
    year: 2016,
    type: "conference",
    doi: "10.1109/VISSOFT.2016.18",
    method:
      "Phân tích Abstract Syntax Tree thay vì đếm số dòng code thay đổi; so sánh AST diff với line diff truyền thống.",
    citations: 18,
    pros: [
      "Hiểu được logic thực sự của mã nguồn, độ chính xác cao",
      "Phương pháp đột phá so với LOC counting",
    ],
    cons: [
      "Chỉ hỗ trợ các ngôn ngữ có parser AST mạnh",
      "Kém linh hoạt với ngôn ngữ động (Python, JS)",
    ],
  },
  {
    id: "s05",
    index: 5,
    title: "Software Evolution Visualization Techniques and Methods — A Systematic Review",
    authors: "H. Salameh, A. Ahmad, A. Aljammal",
    publisher: "International Conference on Computer Science and Information Technologies (CSIT)",
    year: 2016,
    type: "conference",
    method:
      "Đánh giá tổng quan hệ thống (Systematic Literature Review) các kỹ thuật trực quan hóa tiến hóa phần mềm.",
    citations: 16,
    pros: [
      "Gom nhóm và phân loại mạch lạc các kỹ thuật truyền thống",
      "Tổng quan toàn cảnh lĩnh vực nghiên cứu",
    ],
    cons: [
      "Thiếu cập nhật các công cụ tích hợp AI hay Big Data",
      "Dữ liệu khảo sát dừng ở 2015",
    ],
  },
  {
    id: "s06",
    index: 6,
    title: "VisGi: Visualizing Git Branches",
    authors: "S. Elsen",
    publisher: "IEEE Working Conference on Software Visualization (VISSOFT)",
    year: 2013,
    type: "conference",
    doi: "10.1109/VISSOFT.2013.6650522",
    method:
      "Dùng biểu đồ Sunburst và đồ thị DAG để biểu diễn cấu trúc thư mục và lịch sử nhánh Git.",
    citations: 10,
    pros: [
      "Nền tảng kinh điển về lý thuyết vẽ nhánh Git",
      "Kết hợp Sunburst + DAG sáng tạo",
    ],
    cons: [
      "Công nghệ lõi đã cũ",
      "UI dễ rối mắt với repository lớn",
    ],
  },
  {
    id: "s07",
    index: 7,
    title: "Version Control with Git (3rd Edition)",
    authors: "Prem Kumar Ponuthorai, Jon Loeliger",
    publisher: "O'Reilly Media",
    year: 2022,
    type: "book",
    method:
      "Phân tích cấu trúc phần mềm, object model (blob, tree, commit, tag) và nguyên lý hoạt động nội bộ của Git.",
    citations: 0,
    pros: [
      "Uy tín tuyệt đối từ O'Reilly",
      "Bao quát toàn diện mọi cơ chế của Git",
      "Hình minh hoạ rõ ràng, dễ tiếp cận",
    ],
    cons: [
      "Là sách giáo khoa nên không đi sâu vào framework trực quan hóa cụ thể",
      "Thiếu phân tích hiệu năng I/O",
    ],
  },
  {
    id: "s08",
    index: 8,
    title: "Software Evolution and Maintenance: A Practitioner's Approach",
    authors: "Priyadarshi Tripathy, Kshirasagar Naik",
    publisher: "John Wiley & Sons",
    year: 2014,
    type: "book",
    method:
      "Nghiên cứu định lượng vòng đời phần mềm từ góc nhìn quản lý bảo trì; khung lý thuyết cho Software Engineering.",
    citations: 0,
    pros: [
      "Khung lý thuyết vững chắc cho sinh viên ngành SE",
      "Bao quát toàn bộ lifecycle phần mềm",
    ],
    cons: [
      "Tính hàn lâm cao, nặng lý thuyết hơn công cụ thực hành",
      "Trước kỷ nguyên DevOps hiện đại",
    ],
  },
  {
    id: "s09",
    index: 9,
    title: "Git's Database Internals II: Commit History Queries",
    authors: "Derrick Stolee",
    publisher: "The GitHub Blog (GitHub Engineering)",
    year: 2022,
    type: "blog",
    method:
      "Phân tích backend thực tế, giải phẫu cách GitHub truy xuất commit history qua commit-graph file và generation numbers.",
    citations: 0,
    pros: [
      "Case study thực tiễn vô giá từ GitHub (doanh nghiệp tỷ đô)",
      "Chi tiết kỹ thuật chính xác từ kỹ sư core",
    ],
    cons: [
      "Góc nhìn chủ quan từ công ty, không qua bình duyệt độc lập",
      "Tập trung vào hiệu năng hơn visualization",
    ],
  },
  {
    id: "s10",
    index: 10,
    title: "Measuring Git Performance with OpenTelemetry",
    authors: "GitHub Engineering",
    publisher: "The GitHub Blog",
    year: 2023,
    type: "blog",
    method:
      "Áp dụng OpenTelemetry trong môi trường CI/CD Enterprise để đo lường và tối ưu hiệu năng Git operations.",
    citations: 0,
    pros: [
      "Bắt kịp xu hướng DevOps và Observability hiện đại",
      "Cập nhật mới nhất về kỹ thuật đo lường",
    ],
    cons: [
      "Thiên về giám sát hiệu năng mạng thay vì phân tích mã nguồn",
      "Mang màu sắc tiếp thị sản phẩm GitHub",
    ],
  },
  {
    id: "s11",
    index: 11,
    title: "Git is a Directed Acyclic Graph and What the Heck Does That Mean?",
    authors: "Sharon Cichelli",
    publisher: "Medium",
    year: 2017,
    type: "blog",
    method:
      "Phương pháp diễn giải sư phạm, đơn giản hóa cấu trúc thuật toán DAG cho người mới bắt đầu.",
    citations: 0,
    pros: [
      "Dễ hiểu, cực kỳ thân thiện với người mới lập trình",
      "Ngôn ngữ trực quan, nhiều ví dụ đời thường",
    ],
    cons: [
      "Thiếu các số liệu nghiên cứu định lượng",
      "Tính học thuật thấp, không qua peer-review",
    ],
  },
  {
    id: "s12",
    index: 12,
    title: "Visualize Developer Contributions with Stream Graphs",
    authors: "Feststelltaste",
    publisher: "Feststelltaste Tech Blog",
    year: 2017,
    type: "blog",
    method:
      "Hướng dẫn thực hành code Python, xử lý Git log bằng Pandas để tạo Stream Graphs cho việc phân tích đóng góp.",
    citations: 0,
    pros: [
      "Tính \"Hands-on\" cao, sinh viên có thể code theo ngay lập tức",
      "Stack Python + Pandas phổ biến, dễ replicate",
    ],
    cons: [
      "Khối lượng dữ liệu demo nhỏ, chưa tối ưu cho Big Data",
      "Không đi sâu vào thuật toán visualization",
    ],
  },
  {
    id: "s13",
    index: 13,
    title: "Git — Reference Manual",
    authors: "Linus Torvalds et al.",
    publisher: "Git SCM (git-scm.com/docs)",
    year: 2026,
    type: "official",
    method:
      "Đặc tả kỹ thuật (Technical specification) của các lệnh nội bộ Git — nguồn tham chiếu chính thức.",
    citations: 0,
    pros: [
      "Chính xác tuyệt đối, là \"nguồn của mọi nguồn\"",
      "Cập nhật liên tục theo từng phiên bản Git",
    ],
    cons: [
      "Viết dưới dạng tài liệu tra cứu (manual), khô khan",
      "Khó tổng hợp thành góc nhìn toàn cảnh",
    ],
  },
];

export const typeMeta: Record<
  SourceType,
  { label: string; color: string; tint: string }
> = {
  journal: { label: "TẠP CHÍ", color: "#E8701A", tint: "rgba(232,112,26,0.06)" },
  conference: { label: "HỘI NGHỊ", color: "#4A7C59", tint: "rgba(74,124,89,0.06)" },
  book: { label: "SÁCH", color: "#E0DDD5", tint: "rgba(224,221,213,0.04)" },
  blog: { label: "BLOG", color: "#8A8A8A", tint: "rgba(138,138,138,0.04)" },
  official: { label: "CHÍNH THỨC", color: "#C9A961", tint: "rgba(201,169,97,0.05)" },
};
