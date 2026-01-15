
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArchitecturalPrompt = async (
  input: string | { image: string, mimeType: string },
  isTextToPrompt: boolean = true
) => {
  const ai = getAI();
  // Using Flash Lite for low-latency fast responses
  const model = "gemini-2.5-flash-lite-latest";
  
  const systemInstruction = `You are a world-class architectural visualization expert. 
  Your goal is to convert user descriptions or images into professional, highly detailed architectural prompts for AI image generation. 
  Focus on: Style, Building Type, Materials, Camera, Lighting, and Environment. 
  Ensure the tone is professional and precise.`;

  const prompt = isTextToPrompt 
    ? `Convert this description into a professional architectural prompt: "${input as string}"`
    : `Analyze this architectural image and create a professional, structured prompt including style, building type, materials, camera settings, lighting, and context.`;

  const response = await ai.models.generateContent({
    model,
    contents: typeof input === 'string' ? { parts: [{ text: prompt }] } : {
      parts: [
        { inlineData: { data: input.image, mimeType: input.mimeType } },
        { text: prompt }
      ]
    },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          style: { type: Type.STRING },
          buildingType: { type: Type.STRING },
          materials: { type: Type.STRING },
          camera: { type: Type.STRING },
          lighting: { type: Type.STRING },
          environment: { type: Type.STRING },
          fullPrompt: { type: Type.STRING }
        },
        required: ["style", "buildingType", "materials", "camera", "lighting", "environment", "fullPrompt"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateConcept = async (
  input: string | { image: string, mimeType: string },
  isTextToConcept: boolean = true
) => {
  const ai = getAI();
  // Using Pro for complex tasks with max thinking budget
  const model = "gemini-3-pro-preview";
  
  const systemInstruction = `You are a visionary architect and theorist. 
  Generate deep-thinking architectural concepts. Provide conceptual names, narratives, and strategies.`;

  const prompt = isTextToConcept 
    ? `Create an architectural concept for: "${input as string}"`
    : `Analyze this image architecturally and provide a fresh, deeply-reasoned concept direction.`;

  const response = await ai.models.generateContent({
    model,
    contents: typeof input === 'string' ? { parts: [{ text: prompt }] } : {
      parts: [
        { inlineData: { data: input.image, mimeType: input.mimeType } },
        { text: prompt }
      ]
    },
    config: {
      systemInstruction,
      thinkingConfig: { thinkingBudget: 32768 },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          mainIdea: { type: Type.STRING },
          narrative: { type: Type.STRING },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
          materials: { type: Type.ARRAY, items: { type: Type.STRING } },
          formApproach: { type: Type.STRING }
        },
        required: ["name", "mainIdea", "narrative", "keywords", "materials", "formApproach"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateArchitecturalImage = async (
  prompt: string,
  baseImage?: { data: string, mimeType: string },
  aspectRatio: "1:1" | "16:9" | "9:16" = "16:9"
) => {
  const ai = getAI();
  const model = 'gemini-2.5-flash-image';
  
  const contents: any = {
    parts: [{ text: prompt }]
  };

  if (baseImage) {
    contents.parts.unshift({
      inlineData: { data: baseImage.data, mimeType: baseImage.mimeType }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      imageConfig: { aspectRatio }
    }
  });

  const candidate = response.candidates?.[0];
  if (candidate?.content?.parts) {
    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};
