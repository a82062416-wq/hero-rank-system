# n8n 每日股票晨報 — Claude API Prompt 模板

---

## 1. System Prompt（固定，貼入 System 欄位）

```
你是一位台股投資助理，每天早上幫用戶產出五檔個股的簡化晨報。

輸出格式規則：
1. 使用繁體中文
2. 依照以下固定結構輸出，不要加多餘說明
3. 每檔股票包含：股名代號、收盤價、漲跌幅、外資買賣超方向（買超/賣超/持平/待公布）、重要消息一句話
4. 最後加上「整體一句話建議」
5. 輸出為純文字，不使用 markdown 符號

五檔股票：
- 漢唐 (2404)
- 台達電 (2308)
- 晶技 (3042)
- 旺宏 (2337)
- 鴻海 (2317)
```

---

## 2. User Prompt（每次呼叫，貼入 User Message 欄位）

```
今天是 {{$now.toFormat('yyyy/MM/dd')}}，請幫我查詢以下五檔股票昨日收盤的資訊並產出晨報：

漢唐 (2404)、台達電 (2308)、晶技 (3042)、旺宏 (2337)、鴻海 (2317)

請使用 web search 查詢：
1. 各股昨日收盤價與漲跌幅
2. 各股昨日外資買賣超張數（正數=買超，負數=賣超）
3. 各股近期是否有重要消息（營收、法說、重大合約、法人評等異動）

最後給一句整體操作建議。
```

> `{{$now.toFormat('yyyy/MM/dd')}}` 是 n8n 動態日期語法，自動帶入當天日期。

---

## 3. HTTP Request 節點設定（JSON Body）

```json
{
  "method": "POST",
  "url": "https://api.anthropic.com/v1/messages",
  "headers": {
    "x-api-key": "{{ $env.ANTHROPIC_API_KEY }}",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
  },
  "body": {
    "model": "claude-sonnet-4-6",
    "max_tokens": 1500,
    "tools": [
      {
        "type": "web_search_20250305",
        "name": "web_search"
      }
    ],
    "system": "（貼上 System Prompt 內容）",
    "messages": [
      {
        "role": "user",
        "content": "（貼上 User Prompt 內容）"
      }
    ]
  }
}
```

---

## 4. Schedule Trigger（排程節點）

```
Cron expression：30 8 * * 1-5
```

週一到週五早上 8:30 觸發，週六日不跑。

> 注意：若 n8n 時區設定為 UTC，需改為 `30 0 * * 1-5`，或至 n8n 設定將時區改為 `Asia/Taipei`。

---

## 5. Code 節點（取出晨報文字）

HTTP Request 之後加一個 **Code 節點**，用來正確取出 Claude 回傳的文字內容。

> 直接用 `content[0].text` 可能取到空值，因為 Claude 使用 web_search 時，content 陣列前幾項是工具呼叫紀錄，最後才是文字。

```javascript
const contents = $json.content;
const textBlock = contents.filter(c => c.type === 'text').pop();
return [{ json: { report: textBlock?.text || '無法取得晨報' } }];
```

---

## 6. Gmail 節點設定

在 Code 節點之後接 **Gmail 節點**，設定如下：

| 欄位 | 值 |
|---|---|
| Resource | Message |
| Operation | Send |
| To | a82062416@gmail.com |
| Subject | `台股晨報 {{ $now.toFormat('yyyy/MM/dd') }}` |
| Email Type | Text |
| Message | `{{ $json.report }}` |

**前置步驟：**
1. 在 n8n Credentials 新增 **Gmail OAuth2** 憑證
2. 以 Google 帳號授權後即可使用

---

## 7. n8n 工作流節點順序

```
Schedule Trigger (8:30 weekdays)
    ↓
HTTP Request (Claude API)
    ↓
Code 節點（取出最後一個 text block）
    ↓
Gmail（寄送到你的信箱）
```
