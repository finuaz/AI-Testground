# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: providers\ollama\smoke_api_sdk.spec.ts >> Ollama api responds
- Location: providers\ollama\smoke_api_sdk.spec.ts:11:5

# Error details

```
ResponseError: gemma3:4b was retired at 2026-07-15 00:00:00 -0700 PDT (ref: e4dc0508-dc42-4880-b673-fa42c8ef483c)
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
  8  | const ollamaUrl = env.ollamaUrl;
  9  | dotenv.config();
  10 | 
  11 | test("Ollama api responds", async ({ request }) => {
  12 |   test.setTimeout(180000);
  13 | 
  14 |   const ollama = new Ollama({
  15 |     host: ollamaUrl,
  16 |     headers: {
  17 |       Authorization: "Bearer " + apiKey,
  18 |     },
  19 |   });
  20 | 
> 21 |   const response = await ollama.chat({
     |                    ^ ResponseError: gemma3:4b was retired at 2026-07-15 00:00:00 -0700 PDT (ref: e4dc0508-dc42-4880-b673-fa42c8ef483c)
  22 |     
  23 |     model: ollamaModel,
  24 |     messages: [{ role: "user", content: "Explain quantum computing briefly" }],
  25 |     stream: true,
  26 |   });
  27 | 
  28 |   let fullResponse = "";
  29 | 
  30 |   for await (const part of response) {
  31 |     process.stdout.write(part.message.content);
  32 |     fullResponse += part.message.content;
  33 |   }
  34 | 
  35 |   expect(apiKey).toBeDefined();
  36 |   expect(response).toBeDefined();
  37 | 
  38 |   expect(fullResponse.toLowerCase()).toContain(/quantum computing/);
  39 |   expect(fullResponse.toLowerCase()).toMatch(
  40 |     /(quantum|qubit|superposition|entanglement)/
  41 |   );
  42 |   expect(fullResponse.length).toBeGreaterThan(20);
  43 | });
  44 | 
```