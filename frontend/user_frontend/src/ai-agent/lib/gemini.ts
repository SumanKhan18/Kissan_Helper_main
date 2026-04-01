import React from 'react';
import { GoogleGenerativeAI, GenerativeModel, GenerateContentResult } from '@google/generative-ai';

const GEMINI_API_KEY: string = 'AIzaSyDQMXvIrNZbAJOO13hlC4kMuKtEFC7E9Sg';

const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Formats raw farming guide text into a structured, bold-heading, emoji-friendly format.
 */
export function formatFarmingResponse(raw: string): string {
  // Normalize line breaks & trim spaces
  const text = raw.replace(/\r\n/g, "\n").trim();

  // Predefined section headings with emojis
  const sectionMap: Record<string, string> = {
    planning: "1️⃣ Planning & Preparation",
    preparation: "1️⃣ Planning & Preparation",
    planting: "2️⃣ Planting",
    growth: "3️⃣ Growth & Maintenance",
    maintenance: "3️⃣ Growth & Maintenance",
    pest: "🐛 Pest & Disease Management",
    disease: "🐛 Pest & Disease Management",
    harvest: "4️⃣ Harvesting & Post-Harvest",
    harvesting: "4️⃣ Harvesting & Post-Harvest",
    safety: "⚠️ Safety Essentials",
    conclusion: "✅ Conclusion"
  };

  const lines = text
    .split("\n")
    .map(l => l.trim())
    .filter(l => l)
    .map(line => {
      const lower = line.toLowerCase();

      // Format section headers
      for (const key in sectionMap) {
        if (lower.startsWith(key)) {
          return `\n${sectionMap[key]}\n`;
        }
      }

      // Convert stars/dashes into dot bullets
      if (/^(\*|-|•)\s/.test(line)) {
        return line.replace(/^(\*|-|•)\s/, "• ");
      }

      // Convert numbered lists to bullet points
      if (/^\d+\./.test(line)) {
        return line.replace(/^\d+\./, "• ");
      }

      return line;
    });


  // Ensure main title with emoji
  if (!lines[0]?.includes("🌾")) {
    lines.unshift("🌾 Farming Guide");
  }

  // Add conclusion if missing
  if (!lines.some(l => l.toLowerCase().includes("conclusion"))) {
    lines.push("\n✅ Conclusion");
    lines.push("• Consistent monitoring, proper planning, and timely action are the keys to success.");
    lines.push("• Stay informed, adapt to local conditions, and keep learning for better yields.");
  }

  return lines.join("\n");
}

/**
 * Renders the formatted bot message with bold headings (no JSX, works in .ts files)
 */
export function renderBotMessage(message: string) {
  return message.split("\n").map((line, i) => {
    const isHeading = /^\d+️⃣|🌾|✅|⚠️|🐛/.test(line);

    if (isHeading) {
      return React.createElement(
        "div",
        { key: i, style: { fontWeight: "bold", marginTop: "6px" } },
        line
      );
    }

    return React.createElement(
      "div",
      { key: i, style: { marginLeft: "12px" } },
      line
    );
  });
}

// Example usage
const rawText = `
Planning & Preparation
* Choose the right seeds
* Test the soil

Planting
1. Maintain spacing
2. Water regularly
`;

const formatted = formatFarmingResponse(rawText);

// In React: {renderBotMessage(formatted)}
console.log(formatted);


export async function getFarmingAdvice(question: string): Promise<string> {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt: string = `You are a smart, helpful assistant for farmers, agriculture businesses, and rural users. 
    
    Your role:
    - Understand agricultural topics: crops, planting, fertilizers, irrigation, weather, pests, livestock care, equipment
    - Provide practical, actionable advice in simple English
    - Be friendly, encouraging, and patient
    - Focus on farming productivity and safety
    
    User question: ${question}
    
    Please provide a helpful, detailed response with practical steps and tips. Use emojis and bullet points to make it easy to read.`;

    const result: GenerateContentResult = await model.generateContent(prompt);
    const response = await result.response;
    const text: string = response.text();

    return text ? formatFarmingResponse(text)
      : "I'm sorry, I couldn't generate a response right now. Please try asking your question again.";
  } catch (error: unknown) {
    console.error('Gemini API Error:', error);
    return "I'm having trouble connecting to get you an answer right now. Please try again in a moment, or ask a different farming question.";
  }
}

export interface StreamChunk {
  text(): string;
}

export interface StreamResult {
  stream: AsyncIterable<StreamChunk>;
}

export async function getFarmingAdviceStream(question: string): Promise<ReadableStream<string>> {
  const model: GenerativeModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt: string = `You are a smart, helpful assistant for farmers, agriculture businesses, and rural users. 
  
  Your role:
  - Understand agricultural topics: crops, planting, fertilizers, irrigation, weather, pests, livestock care, equipment
  - Provide practical, actionable advice in simple English
  - Be friendly, encouraging, and patient
  - Focus on farming productivity and safety
  
  User question: ${question}
  
  Please provide a helpful, detailed response with practical steps and tips. Use emojis and bullet points to make it easy to read.`;

  try {
    const result: StreamResult = await model.generateContentStream(prompt) as StreamResult;

    return new ReadableStream<string>({
      async start(controller: ReadableStreamDefaultController<string>): Promise<void> {
        try {
          for await (const chunk of result.stream) {
            const chunkText: string = chunk.text();
            if (chunkText) {
              controller.enqueue(chunkText);
            }
          }
          controller.close();
        } catch (error: unknown) {
          controller.error(error);
        }
      }
    });
  } catch (error: unknown) {
    console.error('Gemini Streaming Error:', error);
    return new ReadableStream<string>({
      start(controller: ReadableStreamDefaultController<string>): void {
        controller.enqueue("I'm having trouble connecting to get you an answer right now. Please try again in a moment.");
        controller.close();
      }
    });
  }
}

export interface FarmingQuestion {
  id: string;
  question: string;
  category: string;
  priority: number;
}

export interface FarmingResponse {
  answer: string;
  confidence: number;
  sources?: string[];
  relatedTopics?: string[];
}

export class FarmingAssistant {
  private model: GenerativeModel;

  constructor(apiKey: string = GEMINI_API_KEY) {
    const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async askQuestion(question: string, context?: string): Promise<FarmingResponse> {
    try {
      const contextPrompt: string = context ? `Context: ${context}\n\n` : '';
      const fullPrompt: string = `${contextPrompt}You are an expert farming assistant. Answer this question with practical advice: ${question}`;

      const result: GenerateContentResult = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const answer: string = response.text();

      return {
        answer: answer ? formatFarmingResponse(answer) : "I'm sorry, I couldn't generate a response right now.",
        confidence: 0.9,
        relatedTopics: this.extractRelatedTopics(question)
      };
    } catch (error: unknown) {
      throw new Error(`Failed to get farming advice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private extractRelatedTopics(question: string): string[] {
    const topics: string[] = [];
    const lowerQuestion: string = question.toLowerCase();

    if (lowerQuestion.includes('crop') || lowerQuestion.includes('plant')) {
      topics.push('crop management', 'planting schedules');
    }
    if (lowerQuestion.includes('water') || lowerQuestion.includes('irrigation')) {
      topics.push('irrigation systems', 'water conservation');
    }
    if (lowerQuestion.includes('pest') || lowerQuestion.includes('disease')) {
      topics.push('pest control', 'disease prevention');
    }
    if (lowerQuestion.includes('soil') || lowerQuestion.includes('fertilizer')) {
      topics.push('soil health', 'fertilization');
    }

    return topics;
  }
}

