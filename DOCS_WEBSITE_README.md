# 文檔網站 - 完整說明

## 概述

我已為英雄榜查詢系統建立了一個**可搜尋的說明文件網站**。這個網站將 DEPLOYMENT_GUIDE.md 轉變成一個專業的、互動式的文檔平台，包含完整的導航系統、全文搜尋功能與美觀的排版設計。

## 網站特色

### 1. 現代文檔設計
網站採用現代企業級設計風格，延續英雄榜系統的深藍紫色主題，打造統一的品牌體驗。設計特色包括寬鬆的間距、清晰的排版、流暢的過渡動畫與視覺反饋。

### 2. 完整的導航系統
左側邊欄提供快速導航，用戶可以輕鬆在各個文檔頁面之間切換。麵包屑導航與頁面標題清楚指示用戶的當前位置。頁面底部的「上一頁/下一頁」按鈕方便用戶順序瀏覽文檔。

### 3. 全文搜尋功能
頂部導航欄的搜尋框支援即時搜尋所有文檔內容。搜尋結果以下拉菜單形式顯示，用戶可以快速跳轉到相關頁面。搜尋支援中英文，並可根據標籤進行篩選。

### 4. Markdown 內容渲染
所有文檔內容使用 Markdown 格式編寫，並通過 React Markdown 庫進行渲染。代碼片段使用深色背景與語法高亮，提升可讀性。

### 5. 響應式設計
網站完全適配各種設備，從手機到桌面電腦。在移動設備上，側邊欄可以摺疊，以節省屏幕空間。

### 6. 視覺資源
網站包含專業的視覺資源，包括 Hero 背景圖片與部署流程插圖，增強視覺吸引力。

## 文檔結構

文檔網站包含以下主要頁面：

| 頁面 | 內容 | 標籤 |
|------|------|------|
| **概述** | 系統簡介與儲存庫資訊 | introduction, getting-started |
| **部署指南** | 詳細的 GitHub Pages 部署步驟 | deployment, github-pages |
| **本地開發** | 本地開發環境設置與命令 | development, setup |
| **專案結構** | 文件組織與目錄說明 | structure, organization |
| **設計特色** | 設計風格與色彩方案介紹 | design, styling |
| **常見問題** | 常見問題解答與故障排除 | faq, troubleshooting |

## 技術實現

### 前端技術棧
- **框架**：React 19 + TypeScript
- **樣式**：Tailwind CSS 4
- **路由**：Wouter
- **Markdown 渲染**：React Markdown
- **圖標**：Lucide React

### 核心功能模塊

**文檔數據層** (`client/src/lib/docs-data.ts`)
包含所有文檔內容、導航結構與搜尋邏輯。每個文檔頁面包含標題、內容、標籤與 slug 標識符。

**文檔頁面組件** (`client/src/pages/Docs.tsx`)
主要的文檔展示頁面，包含頂部導航欄、側邊欄導航、搜尋功能、主要內容區域與頁面導航。

**路由配置** (`client/src/App.tsx`)
配置文檔路由 `/docs/:slug*`，支援動態頁面切換。

## 訪問文檔網站

### 本地開發
在本地開發環境中，您可以通過以下地址訪問文檔網站：
```
http://localhost:3001/docs/overview
```

### 線上部署
部署到 GitHub Pages 後，文檔網站將在以下地址可用：
```
https://a82062416-wq.github.io/hero-rank-system/docs/overview
```

## 使用指南

### 導航
使用左側邊欄快速導航到不同的文檔頁面。當前頁面會高亮顯示。

### 搜尋
在頂部搜尋框輸入關鍵字，系統將即時顯示匹配的文檔。點擊搜尋結果可直接跳轉到該頁面。

### 閱讀文檔
文檔內容使用清晰的排版與格式化，包括標題、段落、代碼片段、列表等。點擊外部連結會在新標籤頁中打開。

### 頁面導航
使用頁面底部的「上一頁/下一頁」按鈕順序瀏覽文檔。

## 自訂與擴展

### 新增文檔頁面
要新增新的文檔頁面，請編輯 `client/src/lib/docs-data.ts`，在 `docsData` 陣列中新增新的文檔對象：

```typescript
{
  id: "new-page",
  title: "新頁面標題",
  slug: "new-page",
  tags: ["tag1", "tag2"],
  content: "Markdown 內容..."
}
```

然後在 `navigationItems` 陣列中新增導航項目。

### 修改設計
編輯 `client/src/pages/Docs.tsx` 中的 Tailwind CSS 類名以修改樣式。全域色彩變數定義在 `client/src/index.css` 中。

### 更新內容
直接編輯 `client/src/lib/docs-data.ts` 中的 Markdown 內容，變更將自動反映在網站上。

## 部署步驟

1. 確保所有變更已提交到 Git
2. 推送到 GitHub main 分支
3. 在 GitHub Pages 設定中啟用部署
4. 等待 GitHub Actions 完成構建與部署
5. 訪問 GitHub Pages 網址查看上線的文檔網站

## 性能優化

文檔網站已進行以下優化：

- **客戶端搜尋**：搜尋在瀏覽器中執行，無需伺服器請求
- **懶加載**：圖片與內容按需加載
- **代碼分割**：路由級別的代碼分割，提升初始加載速度
- **CSS 最小化**：Tailwind CSS 生產構建自動移除未使用的樣式

## 常見問題

### Q: 如何更新文檔內容？
A: 編輯 `client/src/lib/docs-data.ts` 中的 `docsData` 陣列，修改相應文檔的 `content` 欄位。

### Q: 搜尋功能不工作？
A: 確保文檔內容已正確添加到 `docsData` 陣列，並且 `title`、`content` 與 `tags` 欄位已填充。

### Q: 如何新增自訂樣式？
A: 編輯 `client/src/pages/Docs.tsx` 中的 Tailwind CSS 類名，或在 `client/src/index.css` 中新增自訂 CSS。

### Q: 文檔網站在移動設備上顯示不正確？
A: 檢查 Tailwind CSS 的響應式類名是否正確使用（如 `lg:hidden`、`md:flex` 等）。

## 技術支援

如有任何問題或需要協助，請聯繫系統管理員或提交 GitHub Issue。

---

**文檔網站完成日期**：2026 年 1 月 26 日  
**最後更新**：2026 年 1 月 26 日
