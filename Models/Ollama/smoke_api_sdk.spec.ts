import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { env } from '../../utils/env';
import { Ollama } from "ollama";

const apiKey = env.ollamaApiKey;
dotenv.config();

test('Ollama api responds', async ({ request }) => {
    const ollama = new Ollama({
      host: "https://ollama.com",
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });
    
    const response = await ollama.chat({
      model: "gemma3:12b",
      messages: [{ role: "user", content: "Explain quantum computing briefly" }],
      stream: true,
    });

    let fullResponse = "";

// for await (const part of response) {
//     fullResponse += part.message.content;
// }

    for await (const part of response) {
      process.stdout.write(part.message.content);
      fullResponse += part.message.content;
    }

    expect(apiKey).toBeDefined();
    expect(response).toBeDefined();

    await expect(fullResponse.toLowerCase()).toContain("quantum computing");
    // await expect(response.message.content).toContain("quantum computing");

});
