// Blueprint: javascript_openai
import OpenAI from "openai";
import { type Profile } from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
