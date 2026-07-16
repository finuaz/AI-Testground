import dotenv from "dotenv";

dotenv.config();

const isCI = !!process.env.GITHUB_ACTIONS;

export const config = {
  ollamaHost: isCI ? "https://ollama.com" : "http://localhost:11434",
  // ollamaHost: isCI ? "https://ollama.com" : "https://ollama.com",
};

export const env = {
  ollamaUrl: process.env.OLLAMA_URL ?? config.ollamaHost,
  ollamaApiKey: process.env.OLLAMA_API_KEY,
  ollamaModel: process.env.OLLAMA_MODEL ?? "gemma3:1b",
};

export const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;
