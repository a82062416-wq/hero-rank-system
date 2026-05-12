# n8n 每日股票晨報設定指南

發送對象：a82062416@gmail.com
發送時間：週一至週五 早上 08:30（台灣時間）

---

## 步驟一：設定時區

進入 n8n → Settings → General → 將 **Timezone** 改為 `Asia/Taipei`，儲存。

---

## 步驟二：建立 Gmail 憑證

1. 進入 n8n → Credentials → 點 **Add Credential**
2. 搜尋選擇 **Gmail OAuth2**
3. 依畫面指示以 Google 帳號（a82062416@gmail.com）登入授權
4. 儲存，記住憑證名稱（例如：`Gmail account`）

---

## 步驟三：建立新工作流，依序加入以下節點

### 節點 1 — Schedule Trigger

| 欄位 | 值 |
|---|---|
| Trigger Interval | Cron |
| Cron Expression | `30 8 * * 1-5` |

---

### 節點 2 — HTTP Request（呼叫 Claude API）

| 欄位 | 值 |
|---|---|
| Method | POST |
| URL | `https://api.anthropic.com/v1/messages` |
| Authentication | None（手動帶 Header） |
| Send Headers | 開啟 |

**Headers：**

| Key | Value |
|---|---|
| x-api-key | 你的 Anthropic API Key |
| anthropic-version | `2023-06-01` |
| content-type | `application/json` |

**Body（選 Raw / JSON）：**

```json
{
  "model": "claude-sonnet-4-6",
  "max_tokens": 1500,
  "tools": [
    {
      "type": "web_search_20250305",
      "name": "web_search"
    }
  ],
  "system": "你是一位台股投資助理，每天早上幫用戶產出五檔個股的簡化晨報。\n\n輸出格式規則：\n1. 使用繁體中文\n2. 依照以下固定結構輸出，不要加多餘說明\n3. 每檔股票包含：股名代號、收盤價、漲跌幅、外資買賣超方向（買超/賣超/持平/待公布）、重要消息一句話\n4. 最後加上「整體一句話建議」\n5. 輸出為純文字，不使用 markdown 符號\n\n五檔股票：\n- 漢唐 (2404)\n- 台達電 (2308)\n- 晶技 (3042)\n- 旺宏 (2337)\n- 鴻海 (2317)",
  "messages": [
    {
      "role": "user",
      "content": "今天是 {{$now.toFormat('yyyy/MM/dd')}}，請幫我查詢以下五檔股票昨日收盤的資訊並產出晨報：\n\n漢唐 (2404)、台達電 (2308)、晶技 (3042)、旺宏 (2337)、鴻海 (2317)\n\n請使用 web search 查詢：\n1. 各股昨日收盤價與漲跌幅\n2. 各股昨日外資買賣超張數（正數=買超，負數=賣超）\n3. 各股近期是否有重要消息（營收、法說、重大合約、法人評等異動）\n\n最後給一句整體操作建議。"
    }
  ]
}
```

---

### 節點 3 — Code（取出晨報文字）

語言選 **JavaScript**，貼入以下程式碼：

```javascript
const contents = $json.content;
const textBlock = contents.filter(c => c.type === 'text').pop();
return [{ json: { report: textBlock?.text || '今日晨報無法取得，請稍後再試。' } }];
```

---

### 節點 4 — Gmail（寄送信件）

| 欄位 | 值 |
|---|---|
| Credential | 選剛才建立的 Gmail OAuth2 |
| Resource | Message |
| Operation | Send |
| To | `a82062416@gmail.com` |
| Subject | `台股晨報 {{ $now.toFormat('yyyy/MM/dd') }}` |
| Email Type | Text |
| Message | `{{ $json.report }}` |

---

## 步驟四：測試

1. 點右上角 **Save** 儲存工作流
2. 點 **Test workflow** 手動執行一次
3. 確認每個節點都顯示綠色勾勾
4. 檢查 a82062416@gmail.com 是否收到晨報

---

## 步驟五：啟用排程

確認測試成功後，將工作流右上角的開關切為 **Active**，之後每週一至週五早上 8:30 自動發送。

---

## 工作流節點順序

```
Schedule Trigger（週一~五 08:30）
    ↓
HTTP Request（Claude API + web_search）
    ↓
Code（取出晨報文字）
    ↓
Gmail → a82062416@gmail.com
```
