// eslint-disable-next-line no-undef
declare const __ENV: Record<string, string | undefined>;

const isCI = !!__ENV.GITHUB_ACTIONS;

export const config = {
  ollamaHost: isCI ? "https://ollama.com" : "http://localhost:11434",
};

export const env = {
  ollamaUrl: __ENV.OLLAMA_URL ?? config.ollamaHost,
  ollamaApiKey: __ENV.OLLAMA_API_KEY,
  ollamaModel: __ENV.OLLAMA_MODEL_K6 || "gemma3:1b",
};

export const OPENROUTER_API_KEY = __ENV.OPENROUTER_API_KEY!;
