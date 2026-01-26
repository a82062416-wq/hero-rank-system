# 英雄榜查詢系統 - GitHub Pages 部署指南

## 概述

本文檔說明如何在 GitHub Pages 上部署英雄榜查詢系統，建立線上永久網址。

## 儲存庫資訊

- **儲存庫地址**：https://github.com/a82062416-wq/hero-rank-system
- **預期 GitHub Pages 網址**：https://a82062416-wq.github.io/hero-rank-system/

## 部署步驟

### 步驟 1：訪問儲存庫設定

1. 打開 https://github.com/a82062416-wq/hero-rank-system
2. 點擊「Settings」（設定）標籤
3. 在左側選單中選擇「Pages」

### 步驟 2：配置 GitHub Pages

在 Pages 設定頁面中：

1. **Build and deployment** 部分
2. 選擇 **Source** 為「GitHub Actions」或「Deploy from a branch」
3. 如果選擇「Deploy from a branch」：
   - 選擇分支：`main`
   - 選擇目錄：`/(root)`
4. 點擊「Save」保存設定

### 步驟 3：等待部署完成

1. 訪問儲存庫的「Actions」標籤
2. 查看部署工作流程的執行狀態
3. 當工作流程完成後，GitHub Pages 將自動發佈您的網站

### 步驟 4：訪問您的網站

部署完成後，您可以在以下地址訪問您的網站：

```
https://a82062416-wq.github.io/hero-rank-system/
```

## 本地開發

### 安裝依賴

```bash
cd hero-rank-system
pnpm install
```

### 啟動開發伺服器

```bash
pnpm dev
```

開發伺服器將在 `http://localhost:3000` 或 `http://localhost:3001` 啟動。

### 構建生產版本

```bash
pnpm build
```

構建輸出將在 `dist/public` 目錄中。

## 專案結構

```
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
```

## 設計特色

本專案採用**現代企業級設計**風格，特色包括：

- **色彩方案**：深藍紫色主色調 + 柔和灰色系 + 黃色警告色
- **排版**：Noto Sans TC 字體確保中文清晰度
- **佈局**：中央卡片式登入設計配合漸層背景
- **互動**：流暢的過渡動畫與視覺反饋

## 常見問題

### Q: 如何自訂網站標題？
A: 編輯 `client/index.html` 中的 `<title>` 標籤。

### Q: 如何修改色彩方案？
A: 編輯 `client/src/index.css` 中的 CSS 變數定義。

### Q: 如何新增新頁面？
A: 在 `client/src/pages/` 目錄中建立新的 `.tsx` 檔案，然後在 `client/src/App.tsx` 中新增路由。

### Q: 部署後網站無法訪問？
A: 檢查 GitHub Pages 設定是否正確，並確保 Actions 工作流程已成功完成。

## 支援

如有任何問題或需要協助，請聯繫系統管理員。

---

**最後更新**：2026 年 1 月 26 日
