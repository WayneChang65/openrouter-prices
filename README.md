# OpenRouter 模型價格查詢工具 (OpenRouter Prices CLI)

A simple command-line tool to fetch and display the latest model prices from the OpenRouter API, sorted by prompt price.  
一個簡單的命令列工具，用於從 OpenRouter API 獲取並顯示最新的模型價格，並按 `prompt price` 之價格排序。

---

## 需求 (Requirements)

- Node.js (v18 or higher is recommended / 建議 v18 或更高版本)
- An OpenRouter API Key (一組 OpenRouter 的 API 金鑰)

---

## 安裝 (Installation)

1. **Clone the repository (if you haven't):**
    **如果您尚未複製專案，請執行：**

    ```bash
    git clone https://github.com/WayneChang65/openrouter-prices.git
    cd openrouter-prices
    ```

2. **Install dependencies:**
    **安裝依賴套件：**

    ```bash
    npm install
    ```

---

## 設定 (Configuration)

This tool requires your OpenRouter API key to be set as an environment variable.  
此工具需要將 OpenRouter API 金鑰設定為環境變數。

You can set it for your current terminal session like this:  
您可以透過以下方式在當前的終端機進行設定：

**On macOS / Linux:**

```bash
export OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

**On Windows (Command Prompt):**

```bash
set OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## 如何使用 (Usage)

Once the dependencies are installed and the API key is configured, run the tool using:  
當依賴套件安裝完成且 API 金鑰也設定好後，使用以下指令執行程式：

```bash
npm start
```

The output will be a table in your terminal showing the top models sorted by their prompt price in ascending order.  
輸出結果將會是一個顯示在您終端機中的表格，其中包含按 `prompt price` 之價格由低到高排序的熱門模型。

---

## 授權條款 (License)

This project is licensed under the MIT License.  
本專案採用 MIT 授權。
