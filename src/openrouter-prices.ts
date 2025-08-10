import got from "got";

const API_KEY = process.env.OPENROUTER_API_KEY; 
const API_URL = "https://openrouter.ai/api/v1/models?order=top-weekly&limit=30";

interface ModelData {
  id: string;
  name: string;
  pricing?: {
    prompt?: number;
    completion?: number;
  };
}

export async function getTopWeeklyModels() {
  try {
    const data = await got(API_URL, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "http://localhost",
        "X-Title": "Top Weekly Models Script",
      },
      responseType: "json"
    }).json<{ data: ModelData[] }>();

    const models = data.data;

    // 排序：以 prompt_price 由低到高，N/A 放最後
    const sortedModels = models.sort((a, b) => {
      const priceA = a.pricing?.prompt ?? Infinity;
      const priceB = b.pricing?.prompt ?? Infinity;
      return priceA - priceB;
    });

    console.table(
      sortedModels.map(m => ({
        name: m.name,
        prompt_price: m.pricing?.prompt ?? "N/A",
      }))
    );
  } catch (err) {
    console.error("Error fetching models:", err);
  }
}

getTopWeeklyModels();
