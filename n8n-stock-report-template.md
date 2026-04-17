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

---

## 5. 取出回覆內容

在後續節點（Line Notify / Gmail / Telegram）使用：

```
{{ $json.content[0].text }}
```

這就是 Claude 產出的晨報正文，直接推送即可。

---

## 6. n8n 工作流節點順序

```
Schedule Trigger (8:30 weekdays)
    ↓
HTTP Request (Claude API)
    ↓
Set Node（取出 content[0].text）
    ↓
Line Notify / Gmail / Telegram（推送給你）
```
