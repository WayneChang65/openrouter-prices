import got from "got";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const API_KEY = process.env.OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/models";

// ES Module equivalent for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRICES_FILE_PATH = path.join(__dirname, "openrouter-prices.json");

interface ModelData {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
    request: string;
    image: string;
  };
  context_length: number;
}

export interface ComparedModel {
  id: string;
  context_length: number;
  promptPrice: number;
  completionPrice: number;
}

/**
 * Fetches model data from the OpenRouter API and saves it to a JSON file.
 */
export async function fetchAndSaveModels() {
  try {
    console.log("Fetching model data from OpenRouter...");
    const response = await got(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      responseType: "json",
    }).json<{ data: ModelData[] }>();

    const models = response.data;

    fs.writeFileSync(PRICES_FILE_PATH, JSON.stringify(models, null, 2));
    console.log(`Model data successfully saved to ${PRICES_FILE_PATH}`);
    
    return models;
  } catch (err) {
    console.error("Error fetching or saving model data:", err);
    return [];
  }
}

/**
 * Reads the prices file and returns the models specified by their ID.
 * @param modelIds - An array of model IDs to retrieve.
 * @returns An array of model data objects.
 */
const getModelsById = (modelIds: string[]): ModelData[] => {
  try {
    if (!fs.existsSync(PRICES_FILE_PATH)) {
      console.error(`Price data file not found at ${PRICES_FILE_PATH}. Please run the fetch command first.`);
      return [];
    }
    const fileContent = fs.readFileSync(PRICES_FILE_PATH, "utf-8");
    const allModels: ModelData[] = JSON.parse(fileContent);
    
    return allModels.filter(model => modelIds.includes(model.id));

  } catch (error) {
    console.error("Error reading or parsing price data:", error);
    return [];
  }
}

/**
 * Compares specified models by their prompt price and returns the sorted IDs and prices.
 * @param modelIds - An array of model IDs to compare.
 * @returns A new array of objects with id, context_length, promptPrice, and completionPrice, sorted by prompt price.
 */
export const compareModels = (modelIds: string[]): ComparedModel[] => {
  const modelsToCompare = getModelsById(modelIds);

  if (modelsToCompare.length === 0) {
    return [];
  }

  // Sort by prompt price (lowest to highest)
  modelsToCompare.sort((a, b) => {
    const priceA = parseFloat(a.pricing.prompt);
    const priceB = parseFloat(b.pricing.prompt);
    return priceA - priceB;
  });

  return modelsToCompare.map(model => ({
    id: model.id,
    context_length: model.context_length,
    promptPrice: parseFloat(model.pricing.prompt),
    completionPrice: parseFloat(model.pricing.completion)
  }));
};


/**
 * Main function to execute the script.
 */
async function main() {
  // Check if the data file exists
  if (!fs.existsSync(PRICES_FILE_PATH)) {
    console.log("Price data file not found. Fetching new data from OpenRouter...");
    await fetchAndSaveModels();
  } else {
    // If file exists, ask the user if they want to update
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'fetchData',
        message: 'Local price data found. Do you want to fetch the latest data from OpenRouter?',
        default: true,
      },
    ]);

    if (answers.fetchData) {
      await fetchAndSaveModels();
    } else {
        console.log("Using local price data.");
    }
  }

  // Example usage of the compareModels function
  console.log("\n--- Comparing selected models by price (using IDs) ---");
  const modelsToCompareById = [
    "openai/gpt-5-chat",
    "openai/gpt-5-mini",
    "openai/gpt-5-nano",
    "google/gemma-7b-it:free",
    "google/gemini-2.5-flash",
    "google/gemini-2.5-pro",
    "meta-llama/llama-2-70b-chat",
    "openai/gpt-4o",
    "openai/gpt-4o-mini",
    "deepseek/deepseek-chat-v3-0324:free",
    "deepseek/deepseek-chat-v3-0324",
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "openai/gpt-oss-20b:free"
  ];
  
  console.log("Model IDs to compare:", modelsToCompareById.join(", "));
  
  const sortedModels = compareModels(modelsToCompareById);
  
  if (sortedModels.length > 0) {
    console.log("\nSorted by prompt price (cheapest first, per 1M tokens):");
    
    const tableData = sortedModels.map(model => ({
      "Model ID": model.id,
      "Max Tokens": model.context_length.toLocaleString(),
      "Prompt Price": model.promptPrice > 0 ? `${model.promptPrice.toFixed(9)}` : "Free",
      "Completion Price": model.completionPrice > 0 ? `${model.completionPrice.toFixed(9)}` : "Free"
    }));

    console.table(tableData);

  } else {
    console.log("\nCould not retrieve or sort models. Please check the IDs or the data file.");
  }
}

main();
