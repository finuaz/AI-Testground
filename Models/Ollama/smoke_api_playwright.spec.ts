// import { test, expect } from '@playwright/test';
// import dotenv from 'dotenv';
// import { env } from '../../utils/env';
// // import { Ollama } from "ollama";

// const apiKey = env.ollamaApiKey;
// dotenv.config();

// test('Ollama api responds', async ({ request }) => {
//     // const ollama = new Ollama({
//     //   host: "https://ollama.com",
//     //   headers: {
//     //     Authorization: "Bearer " + apiKey,
//     //   },
//     // });
    
//     // const response = await ollama.chat({
//     //   model: "gemma3:12b",
//     //   messages: [{ role: "user", content: "Explain quantum computing briefly" }],
//     //   stream: true,
//     // });
    
//     const response = await request.post(
//     "https://ollama.com",
//         {
//             headers: {
//                 Authorization: "Bearer " + apiKey,
//             },
//             data: {
//                 model: "gemma3:12b",
//                 prompt: "Explain quantum computing briefly",
//                 messages: [{ role: "user", content: "Explain quantum computing briefly" }],
//                 stream: false
//             }
//         }
//     );

//     const body = await response.json();

//     // for await (const part of response) {
//     //   process.stdout.write(part.message.content);
//     // }

//     await expect(apiKey).toBeDefined();
//     await expect(response).toBeDefined();

//     await expect(body.response).toContain('quantum computing');


    
// });

