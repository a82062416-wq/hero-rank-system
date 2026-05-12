import anthropic
import smtplib
import os
from email.mime.text import MIMEText
from datetime import datetime

RECIPIENT = "a82062416@gmail.com"
SYSTEM_PROMPT = """你是一位台股投資助理，每天早上幫用戶產出五檔個股的簡化晨報。

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
- 鴻海 (2317)"""


def get_report() -> str:
    today = datetime.now().strftime("%Y/%m/%d")
    user_prompt = f"""今天是 {today}，請幫我查詢以下五檔股票昨日收盤的資訊並產出晨報：

漢唐 (2404)、台達電 (2308)、晶技 (3042)、旺宏 (2337)、鴻海 (2317)

請使用 web search 查詢：
1. 各股昨日收盤價與漲跌幅
2. 各股昨日外資買賣超張數（正數=買超，負數=賣超）
3. 各股近期是否有重要消息（營收、法說、重大合約、法人評等異動）

最後給一句整體操作建議。"""

    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1500,
        system=SYSTEM_PROMPT,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        messages=[{"role": "user", "content": user_prompt}],
    )

    text_blocks = [b for b in response.content if b.type == "text"]
    return text_blocks[-1].text if text_blocks else "今日晨報無法取得。"


def send_email(report: str) -> None:
    today = datetime.now().strftime("%Y/%m/%d")
    msg = MIMEText(report, "plain", "utf-8")
    msg["Subject"] = f"台股晨報 {today}"
    msg["From"] = os.environ["GMAIL_USER"]
    msg["To"] = RECIPIENT

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(os.environ["GMAIL_USER"], os.environ["GMAIL_APP_PASSWORD"])
        server.send_message(msg)

    print(f"晨報已寄送至 {RECIPIENT}")


if __name__ == "__main__":
    report = get_report()
    print(report)
    send_email(report)
