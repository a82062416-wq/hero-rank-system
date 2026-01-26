import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { docsData, navigationItems, searchDocs, getDocBySlug } from "@/lib/docs-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * 文檔網站頁面
 * 
 * 設計風格：現代文檔風格
 * - 側邊欄導航 + 主要內容區域
 * - 全文搜尋功能
 * - Markdown 內容渲染
 * - 響應式設計
 */

export default function Docs() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 從 URL 獲取當前頁面
  const currentSlug = location.replace("/docs/", "").replace("/", "") || "overview";
  const currentDoc = getDocBySlug(currentSlug);

  // 搜尋結果
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchDocs(searchQuery);
  }, [searchQuery]);

  const handleNavigate = (slug: string) => {
    navigate(`/docs/${slug}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* 頂部導航欄 */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📚</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">部署指南</h1>
            </div>
          </div>

          {/* 搜尋框 */}
          <div className="flex-1 max-w-md mx-4 relative">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="搜尋文檔..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              {/* 搜尋結果下拉菜單 */}
              {isSearchOpen && searchQuery && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleNavigate(result.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-purple-50 border-b border-gray-100 last:border-0 transition-colors"
                    >
                      <p className="font-semibold text-gray-900">{result.title}</p>
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {result.content.substring(0, 80)}...
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        {/* 側邊欄 */}
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:relative w-64 h-[calc(100vh-73px)] lg:h-auto bg-white border-r border-gray-200 p-6 overflow-y-auto transition-transform duration-300 z-40`}
        >
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleNavigate(item.slug)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  currentSlug === item.slug
                    ? "bg-purple-100 text-purple-900 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.title}</span>
                  {currentSlug === item.slug && <ChevronRight size={16} />}
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* 主要內容區域 */}
        <main className="flex-1 p-8 lg:p-12">
          {currentDoc ? (
            <article className="prose prose-sm max-w-none">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{currentDoc.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {currentDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Markdown 內容 */}
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <ReactMarkdown
                  components={{
                    h2: ({ children }: any) => (
                      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                    ),
                    h3: ({ children }: any) => (
                      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">{children}</h3>
                    ),
                    p: ({ children }: any) => <p className="text-gray-700 leading-relaxed">{children}</p>,
                    code: ({ inline, children }: any) =>
                      inline ? (
                        <code className="bg-gray-100 text-purple-600 px-2 py-1 rounded text-sm font-mono">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
                          {children}
                        </code>
                      ),
                    pre: ({ children }: any) => <pre className="bg-gray-900 rounded-lg p-4">{children}</pre>,
                    ul: ({ children }: any) => (
                      <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">{children}</ol>
                    ),
                    li: ({ children }: any) => <li className="text-gray-700">{children}</li>,
                    a: ({ href, children }: any) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 underline"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }: any) => (
                      <blockquote className="border-l-4 border-purple-600 pl-4 py-2 text-gray-600 italic">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {currentDoc.content}
                </ReactMarkdown>
              </div>

              {/* 頁面導航 */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
                {currentSlug !== "overview" && (
                  <Button
                    onClick={() => {
                      const currentIndex = navigationItems.findIndex((item) => item.slug === currentSlug);
                      if (currentIndex > 0) {
                        handleNavigate(navigationItems[currentIndex - 1].slug);
                      }
                    }}
                    variant="outline"
                    className="text-gray-700 border-gray-300"
                  >
                    ← 上一頁
                  </Button>
                )}
                <div className="flex-1" />
                {currentSlug !== "faq" && (
                  <Button
                    onClick={() => {
                      const currentIndex = navigationItems.findIndex((item) => item.slug === currentSlug);
                      if (currentIndex < navigationItems.length - 1) {
                        handleNavigate(navigationItems[currentIndex + 1].slug);
                      }
                    }}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    下一頁 →
                  </Button>
                )}
              </div>
            </article>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">找不到該頁面</p>
              <Button
                onClick={() => handleNavigate("overview")}
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                返回首頁
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* 搜尋結果背景遮罩 */}
      {isSearchOpen && searchQuery && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSearchOpen(false)}
        />
      )}
    </div>
  );
}
