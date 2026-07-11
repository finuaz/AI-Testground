import dotenv from 'dotenv';

dotenv.config();

export const env = {
    openAIKey: process.env.OPENAI_API_KEY!,
    anthropicKey: process.env.ANTHROPIC_API_KEY!,
    geminiKey: process.env.GEMINI_API_KEY!,
    ollamaUrl: process.env.OLLAMA_URL ?? "http://localhost:11434",
    ollamaApiKey: process.env.OLLAMA_API_KEY,
};