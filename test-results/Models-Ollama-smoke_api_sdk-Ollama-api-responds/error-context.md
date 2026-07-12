# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Models\Ollama\smoke_api_sdk.spec.ts >> Ollama api responds
- Location: Models\Ollama\smoke_api_sdk.spec.ts:10:5

# Error details

```
ResponseError: {"error": "model 'gemma3:1b' not found"}

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import dotenv from "dotenv";
  3  | import { env } from "../../utils/env";
  4  | import { Ollama } from "ollama";
  5  | 
  6  | const apiKey = env.ollamaApiKey;
  7  | const ollamaModel = env.ollamaModel;
  8  | dotenv.config();
  9  | 
  10 | test("Ollama api responds", async ({ request }) => {
  11 |   const ollama = new Ollama({
  12 |     host: "https://ollama.com",
  13 |     headers: {
  14 |       Authorization: "Bearer " + apiKey,
  15 |     },
  16 |   });
  17 | 
> 18 |   const response = await ollama.chat({
     |                    ^ ResponseError: {"error": "model 'gemma3:1b' not found"}
  19 |     model: ollamaModel,
  20 |     messages: [{ role: "user", content: "Explain quantum computing briefly" }],
  21 |     stream: true,
  22 |   });
  23 | 
  24 |   let fullResponse = "";
  25 | 
  26 |   // for await (const part of response) {
  27 |   //     fullResponse += part.message.content;
  28 |   // }
  29 | 
  30 |   for await (const part of response) {
  31 |     process.stdout.write(part.message.content);
  32 |     fullResponse += part.message.content;
  33 |   }
  34 | 
  35 |   expect(apiKey).toBeDefined();
  36 |   expect(response).toBeDefined();
  37 | 
  38 |   await expect(fullResponse.toLowerCase()).toContain("quantum computing");
  39 |   // await expect(response.message.content).toContain("quantum computing");
  40 | });
  41 | 
```