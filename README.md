# OpenRouter Model Price Comparision Tool

本工具是一個命令列介面 (CLI)，能幫助您從 OpenRouter API 獲取模型資訊，並根據您指定的模型 ID 列表，對其價格和相關參數進行比較。  

A command-line tool to fetch model information from the OpenRouter API and compare prices and parameters for a specified list of model IDs.  

---

## 功能 (Features)

- **互動式資料更新**: 首次執行或本地資料不存在時，會自動從 OpenRouter API 抓取最新的模型資料。若本地已有快取資料，則會詢問您是否要下載更新。  
  *Interactive Data Fetching*: Automatically fetches the latest model data from the OpenRouter API on the first run or if local data is missing. If cached data exists, it will ask if you want to download updates.

- **本地快取**: 抓取下來的資料會儲存在 `src/openrouter-prices.json` 中，方便您離線查詢或加速後續執行。  
  *Local Caching*: Fetched data is stored in `src/openrouter-prices.json`, allowing for offline queries and faster subsequent executions.

- **客製化比較列表**: 您可以輕鬆編輯 `src/openrouter-prices.ts` 檔案中的 `modelsToCompareById` 陣列，來指定您想比較的模型。  
  *Customizable Comparison List*: You can easily edit the `modelsToCompareById` array in the `src/openrouter-prices.ts` file to specify the models you want to compare.

- **清晰的表格輸出**: 結果會以格式化的表格呈現，包含模型 ID、最大 Tokens 數、Prompt 價格和 Completion 價格，並依照 Prompt 價格由低到高排序。  
  *Clear Table Output*: The results are displayed in a formatted table, including Model ID, Max Tokens, Prompt Price, and Completion Price, sorted by the prompt price in ascending order.

---

## 需求 (Requirement)

- Node.js (建議使用 v18 或更高版本 / v18 or higher is recommended)
- 一組 OpenRouter 的 API 金鑰 (An OpenRouter API Key)

---

## 安裝 (Install)  

1. **複製專案 (如果您尚未執行過):**  
    **Clone the repository (if you haven't):**

    ```bash
    git clone https://github.com/WayneChang65/openrouter-prices.git
    cd openrouter-prices
    ```

2. **安裝依賴套件:**  
    **Install dependencies:**

    ```bash
    npm install
    ```

---

## 設定 (Setup)  

此工具需要將您的 OpenRouter API 金鑰設定為環境變數。  
This tool requires your OpenRouter API key to be set as an environment variable.

**在 macOS / Linux 上:**  
**On macOS / Linux:**

```bash
export OPENROUTER_API_KEY="your_openrouter_api_key_here"
```

**在 Windows (命令提示字元) 上:**  
**On Windows (Command Prompt):**

```bash
set OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## 如何使用 (How to Use)  

設定好 API 金鑰後，使用以下指令執行程式：  
Once the API key is configured, run the tool using:

```bash
npm run start
```

### 執行流程 (Execution Flow)

1. 程式會先檢查 `src/openrouter-prices.json` 是否存在。  
The script first checks if `src/openrouter-prices.json` exists.
2. 如果**不存在**，它會自動從 OpenRouter API 抓取資料並儲存。  
If it **does not exist**, it automatically fetches and saves the data from the OpenRouter API.  
3. 如果**存在**，它會詢問您是否要下載最新的資料。  
If it **exists**, it will ask if you want to download the latest data.
    - 輸入 `Y` (預設) 會抓取並覆蓋舊資料。  
      Entering `Y` (default) will fetch and overwrite the old data.
    - 輸入 `n` 會直接使用本地的舊資料。  
      Entering `n` will proceed using the local data.  
4. 最後，程式會根據您在 `src/openrouter-prices.ts` 中設定的 `modelsToCompareById` 列表，顯示比較結果的表格。  
Finally, the script displays the comparison table based on the `modelsToCompareById` list you configure in `src/openrouter-prices.ts`.  

### 輸出範例 (Example Output)

```text
┌─────────┬──────────────────────────────┬────────────┬───────────────┬──────────────────┐
│ (index) │ Model ID                     │ Max Tokens │ Prompt Price  │ Completion Price │
├─────────┼──────────────────────────────┼────────────┼───────────────┼──────────────────┤
│ 0       │ 'openai/gpt-4o-mini'         │ '400,000'  │ '0.000000150' │ '0.000000600'    │
│ 1       │ 'google/gemini-2.5-flash'    │ '1,048,576'│ '0.000000300' │ '0.000002500'    │
│ ...     │ ...                          │ ...        │ ...           │ ...              │
└─────────┴──────────────────────────────┴────────────┴───────────────┴──────────────────┘
```

---

## 授權條款 (License)  

本專案採用 MIT 授權。
This project is licensed under the MIT License.
