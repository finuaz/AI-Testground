// eslint-disable-next-line no-undef
declare const __ENV: Record<string, string | undefined>;

export const env = {
  ollamaUrl: __ENV.OLLAMA_URL ?? "http://localhost:11434",
  ollamaApiKey: __ENV.OLLAMA_API_KEY,
  ollamaModel: __ENV.OLLAMA_MODEL || "gemma3:1b",
};

export const OPENROUTER_API_KEY = __ENV.OPENROUTER_API_KEY!;
