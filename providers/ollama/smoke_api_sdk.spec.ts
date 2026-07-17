// import { test, expect } from "@playwright/test";
// import dotenv from "dotenv";
// import { env } from "../../utils/env";
// import { Ollama } from "ollama";

// const apiKey = env.ollamaApiKey;
// const ollamaModel = env.ollamaModel;
// const ollamaUrl = env.ollamaUrl;
// dotenv.config();

// test("Ollama api responds", async ({ request }) => {
//   test.setTimeout(180000);

//   const ollama = new Ollama({
//     host: ollamaUrl,
//     headers: {
//       Authorization: "Bearer " + apiKey,
//     },
//   });

//   const response = await ollama.chat({
//     model: ollamaModel,
//     messages: [{ role: "user", content: "Explain quantum computing briefly" }],
//     stream: true,
//   });

//   let fullResponse = "";

//   for await (const part of response) {
//     process.stdout.write(part.message.content);
//     fullResponse += part.message.content;
//   }

//   expect(apiKey).toBeDefined();
//   expect(response).toBeDefined();

//   expect(fullResponse.toLowerCase()).toContain(/quantum computing/);
//   expect(fullResponse.toLowerCase()).toMatch(/(quantum|qubit|superposition|entanglement)/);
//   expect(fullResponse.length).toBeGreaterThan(20);
// });
