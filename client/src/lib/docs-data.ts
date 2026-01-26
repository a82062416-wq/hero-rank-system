export interface DocSection {
  id: string;
  title: string;
  slug: string;
  content: string;
  tags: string[];
  subsections?: DocSection[];
}

export const docsData: DocSection[] = [
  {
    id: "overview",
    title: "概述",
    slug: "overview",
    tags: ["introduction", "getting-started"],
    content: `本文檔說明如何在 GitHub Pages 上部署英雄榜查詢系統，建立線上永久網址。

## 儲存庫資訊

- **儲存庫地址**：https://github.com/a82062416-wq/hero-rank-system
- **預期 GitHub Pages 網址**：https://a82062416-wq.github.io/hero-rank-system/

這份指南將帶您完成從本地開發到線上部署的完整流程。`,
  },
  {
    id: "deployment",
    title: "部署指南",
    slug: "deployment",
    tags: ["deployment", "github-pages"],
    content: `## 部署步驟

### 步驟 1：訪問儲存庫設定

1. 打開 https://github.com/a82062416-wq/hero-rank-system
2. 點擊「Settings」（設定）標籤
3. 在左側選單中選擇「Pages」

### 步驟 2：配置 GitHub Pages

在 Pages 設定頁面中：

1. **Build and deployment** 部分
2. 選擇 **Source** 為「GitHub Actions」或「Deploy from a branch」
3. 如果選擇「Deploy from a branch」：
   - 選擇分支：\`main\`
   - 選擇目錄：\`/(root)\`
4. 點擊「Save」保存設定

### 步驟 3：等待部署完成

1. 訪問儲存庫的「Actions」標籤
2. 查看部署工作流程的執行狀態
3. 當工作流程完成後，GitHub Pages 將自動發佈您的網站

### 步驟 4：訪問您的網站

部署完成後，您可以在以下地址訪問您的網站：

\`\`\`
https://a82062416-wq.github.io/hero-rank-system/
\`\`\``,
  },
  {
    id: "local-development",
    title: "本地開發",
    slug: "local-development",
    tags: ["development", "setup"],
    content: `## 本地開發環境

### 安裝依賴

首先，進入專案目錄並安裝所有依賴：

\`\`\`bash
cd hero-rank-system
pnpm install
\`\`\`

### 啟動開發伺服器

使用以下命令啟動開發伺服器：

\`\`\`bash
pnpm dev
\`\`\`

開發伺服器將在 \`http://localhost:3000\` 或 \`http://localhost:3001\` 啟動。您可以在瀏覽器中打開此地址查看您的應用。

### 構建生產版本

當您準備好部署時，使用以下命令構建生產版本：

\`\`\`bash
pnpm build
\`\`\`

構建輸出將在 \`dist/public\` 目錄中。`,
  },
  {
    id: "project-structure",
    title: "專案結構",
    slug: "project-structure",
    tags: ["structure", "organization"],
    content: `## 文件組織

英雄榜查詢系統採用以下目錄結構：

\`\`\`
hero-rank-system/
├── client/
│   ├── public/          # 靜態資源
│   ├── src/
│   │   ├── pages/       # 頁面組件
│   │   ├── components/  # 可重用組件
│   │   ├── App.tsx      # 路由與頂層佈局
│   │   ├── main.tsx     # React 進入點
│   │   └── index.css    # 全域樣式與設計令牌
│   └── index.html       # HTML 模板
├── package.json         # 專案依賴
└── README.md           # 專案說明
\`\`\`

### 目錄說明

**client/public/** 存放靜態資源，如圖片、字體等。這些文件將被直接複製到構建輸出中。

**client/src/pages/** 包含頁面級別的 React 組件。每個頁面對應一個路由。

**client/src/components/** 包含可重用的 UI 組件。這些組件可以在多個頁面中使用。

**client/src/index.css** 定義全域樣式與 Tailwind CSS 設計令牌。`,
  },
  {
    id: "design-features",
    title: "設計特色",
    slug: "design-features",
    tags: ["design", "styling"],
    content: `## 設計風格

本專案採用**現代企業級設計**風格，特色包括：

### 色彩方案

- **主色調**：深藍紫色 (#5B4B9F) - 傳達專業與信任
- **強調色**：亮紫色 (#6B5FD4) - 用於互動元素
- **背景色**：柔和灰色系 - 提供視覺呼吸空間
- **警告色**：溫暖黃色 (#FDB022) - 用於提示與警告

### 排版系統

- **標題字體**：Noto Sans TC (600-700 weight) - 現代、清晰
- **正文字體**：Noto Sans TC (400 weight) - 高可讀性
- **代碼字體**：Fira Code - 等寬字體，適合代碼展示

### 佈局與間距

- **圓角半徑**：8px - 現代感的圓角設計
- **陰影**：細微陰影增加深度感
- **間距**：寬鬆的內外邊距，提升可讀性

### 互動設計

- **過渡動畫**：200ms 平滑過渡
- **懸停效果**：顏色加深、輕微放大
- **加載狀態**：旋轉圖標表示處理中`,
  },
  {
    id: "faq",
    title: "常見問題",
    slug: "faq",
    tags: ["faq", "troubleshooting"],
    content: `## 常見問題解答

### Q: 如何自訂網站標題？

**A:** 編輯 \`client/index.html\` 中的 \`<title>\` 標籤。例如：

\`\`\`html
<title>我的自訂標題</title>
\`\`\`

### Q: 如何修改色彩方案？

**A:** 編輯 \`client/src/index.css\` 中的 CSS 變數定義。在 \`:root\` 選擇器中修改顏色值。

### Q: 如何新增新頁面？

**A:** 在 \`client/src/pages/\` 目錄中建立新的 \`.tsx\` 檔案，然後在 \`client/src/App.tsx\` 中新增路由。

### Q: 部署後網站無法訪問？

**A:** 檢查以下幾點：
1. GitHub Pages 設定是否正確
2. Actions 工作流程是否已成功完成
3. 儲存庫是否為公開（如果使用免費 GitHub Pages）

### Q: 如何在本地測試生產構建？

**A:** 使用以下命令：

\`\`\`bash
pnpm build
pnpm preview
\`\`\`

### Q: 如何更新已部署的網站？

**A:** 只需推送新的提交到 main 分支，GitHub Actions 將自動重新部署。`,
  },
];

export const navigationItems = [
  { title: "概述", slug: "overview" },
  { title: "部署指南", slug: "deployment" },
  { title: "本地開發", slug: "local-development" },
  { title: "專案結構", slug: "project-structure" },
  { title: "設計特色", slug: "design-features" },
  { title: "常見問題", slug: "faq" },
];

export function getDocBySlug(slug: string): DocSection | undefined {
  return docsData.find((doc) => doc.slug === slug);
}

export function getAllDocs(): DocSection[] {
  return docsData;
}

export function searchDocs(query: string): DocSection[] {
  const lowerQuery = query.toLowerCase();
  return docsData.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
