// Blueprint: javascript_openai
import OpenAI from "openai";
import { type Profile } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
let openaiClient: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured. Please add it to use matching features.");
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

export interface CompatibilityScore {
  overallScore: number;
  nicheScore: number;
  wholePersonScore: number;
  opportunitiesScore: number;
  nicheMatches: string[];
  wholePersonInsights: string[];
  opportunityMatches: string[];
  explanation: string;
}

export async function generateProfileEmbedding(profile: Profile): Promise<number[]> {
  const openai = getOpenAI();
  const profileText = `
    Books: ${profile.books.join(", ")}
    Music: ${profile.music.join(", ")}
    Hobbies: ${profile.hobbies.join(", ")}
    Seeking: ${profile.seeking.join(", ")}
  `.trim();

  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: profileText,
  });

  return response.data[0].embedding;
}

export async function calculateCompatibility(
  profile1: Profile,
  profile2: Profile
): Promise<CompatibilityScore> {
  // First, try embedding-based similarity if both profiles have embeddings
  let embeddingScore = 0;
  if (profile1.embedding && profile2.embedding) {
    try {
      const embedding1 = JSON.parse(profile1.embedding);
      const embedding2 = JSON.parse(profile2.embedding);
      const similarity = cosineSimilarity(embedding1, embedding2);
      embeddingScore = Math.round(similarity * 100);
    } catch (e) {
      console.error("Failed to compute embedding similarity:", e);
    }
  }

  // If OpenAI is not configured, return embedding-based score only
  if (!process.env.OPENAI_API_KEY) {
    return {
      overallScore: embeddingScore,
      nicheScore: embeddingScore,
      wholePersonScore: embeddingScore,
      opportunitiesScore: 0,
      nicheMatches: [],
      wholePersonInsights: ["Based on overall profile similarity"],
      opportunityMatches: [],
      explanation: `${embeddingScore}% compatible based on profile similarity. Connect OpenAI for detailed analysis.`,
    };
  }

  // Use AI for detailed scoring
  try {
    const prompt = `You are a compatibility matching expert. Analyze these two profiles and calculate compatibility scores.

Profile 1:
- Books: ${profile1.books.join(", ") || "None"}
- Music: ${profile1.music.join(", ") || "None"}
- Hobbies: ${profile1.hobbies.join(", ") || "None"}
- Seeking: ${profile1.seeking.join(", ") || "None"}

Profile 2:
- Books: ${profile2.books.join(", ") || "None"}
- Music: ${profile2.music.join(", ") || "None"}
- Hobbies: ${profile2.hobbies.join(", ") || "None"}
- Seeking: ${profile2.seeking.join(", ") || "None"}

Calculate three types of compatibility:
1. Niche Score (0-100): Specific shared interests (e.g., both love "Island of Dr. Moreau")
2. Whole Person Score (0-100): Overall compatibility across all dimensions
3. Opportunities Score (0-100): Complementary needs/opportunities (one seeking what other offers)

Respond in JSON format:
{
  "nicheScore": number,
  "wholePersonScore": number,
  "opportunitiesScore": number,
  "nicheMatches": ["specific shared interest 1", "specific shared interest 2"],
  "wholePersonInsights": ["insight 1", "insight 2"],
  "opportunityMatches": ["complementary opportunity 1"],
  "explanation": "2-3 sentence explanation of why they matched"
}`;

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing human compatibility based on interests and opportunities.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    const overallScore = Math.round(
      (result.nicheScore * 0.4 + result.wholePersonScore * 0.4 + result.opportunitiesScore * 0.2)
    );

    return {
      overallScore,
      nicheScore: result.nicheScore || 0,
      wholePersonScore: result.wholePersonScore || 0,
      opportunitiesScore: result.opportunitiesScore || 0,
      nicheMatches: result.nicheMatches || [],
      wholePersonInsights: result.wholePersonInsights || [],
      opportunityMatches: result.opportunityMatches || [],
      explanation: result.explanation || "Compatibility analysis pending",
    };
  } catch (error) {
    console.error("AI compatibility scoring failed:", error);
    // Fallback to embedding score
    return {
      overallScore: embeddingScore,
      nicheScore: embeddingScore,
      wholePersonScore: embeddingScore,
      opportunitiesScore: 0,
      nicheMatches: [],
      wholePersonInsights: ["Based on overall profile similarity"],
      opportunityMatches: [],
      explanation: `${embeddingScore}% compatible based on profile similarity.`,
    };
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}
