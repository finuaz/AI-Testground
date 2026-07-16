export const env = {
  ollamaUrl: __ENV.OLLAMA_URL || "http://localhost:11434",

  ollamaModel: __ENV.OLLAMA_MODEL_K6 || "gemma3:4b",

  apiKey: __ENV.OLLAMA_API_KEY || "",

  isCI: __ENV.CI === "true",
};
