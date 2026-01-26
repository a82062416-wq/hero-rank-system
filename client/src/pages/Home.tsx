import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Trophy } from "lucide-react";

/**
 * 英雄榜查詢系統 - 登入頁面
 * 
 * 設計風格：現代企業級設計
 * - 深藍紫色主色調傳達專業性
 * - 中央卡片式佈局
 * - 黃色警告卡片突出免責聲明
 * - 流暢的互動動畫與視覺反饋
 */

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username.trim() || !password.trim()) {
      setError("帳號與密碼不能為空");
      return;
    }

    setIsLoading(true);
    // 模擬登入延遲
    setTimeout(() => {
      setIsLoading(false);
      // 實際應用中應連接後端 API
      console.log("登入嘗試:", { username, password });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 主卡片容器 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 標題區域 */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Trophy className="w-8 h-8 text-yellow-300" />
              <h1 className="text-2xl font-bold text-white">英雄榜查詢系統</h1>
            </div>
            <p className="text-purple-100 text-sm font-medium">表彰優秀，激勵前行</p>
          </div>

          {/* 內容區域 */}
          <div className="px-6 py-8">
            {/* 免責聲明卡片 */}
            <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-yellow-800">
                  <p className="font-semibold mb-2">免責聲明與個人資料保護聲明</p>
                  <div className="space-y-1 text-yellow-700">
                    <p><strong>使用條款：</strong>本系統僅供內部管理使用，所有資料均經授權處理</p>
                    <p><strong>法律責任：</strong>系統管理方不承擔因不當使用所產生之任何法律責任</p>
                    <p><strong>個資保護：</strong>依據個人資料保護法第8條，您有權查詢、請求閱覽、請求製給複製本、請求補正或更新、請求停止蒐集處理或利用、請求刪除個人資料</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 登入表單 */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  帳號
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="請輸入帳號"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  密碼
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="請輸入密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    登入中...
                  </div>
                ) : (
                  "登入"
                )}
              </Button>
            </form>

            {/* 底部提示 */}
            <p className="text-center text-xs text-gray-500 mt-6">
              此系統受到嚴格的安全保護
            </p>
          </div>
        </div>

        {/* 底部說明 */}
        <div className="mt-6 text-center text-xs text-gray-600 space-y-1">
          <p>如有任何問題，請聯繫系統管理員</p>
          <p className="text-gray-500">© 2026 英雄榜查詢系統</p>
        </div>
      </div>
    </div>
  );
}
