import http from "k6/http";
import { env } from "./env.k6.ts";

// export function chat(prompt, {
//         model = env.ollamaModel,
//         temperature = 0,
//     } = {}) {

//     const payload = JSON.stringify({
//         model,

//         messages: [
//             {
//                 role: "user",
//                 content: prompt,
//             },
//         ],

//         options: {
//             temperature,
//         },

//         stream: false,
//     });

//     const params = {
//         headers: {
//             "Content-Type": "application/json",

//             ...(env.apiKey && {
//                 Authorization: `Bearer ${env.apiKey}`,
//             }),
//         },
//     };

//     return http.post(
//         `${env.ollamaUrl}/api/chat`,
//         payload,
//         params
//     );
// }

export function createClient({ local }) {
  const baseUrl = local ? "http://localhost:11434" : "https://ollama.com";

  function chat(prompt, { model = env.ollamaModel, temperature = 0 } = {}) {
    const payload = JSON.stringify({
      model,

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      options: {
        temperature,
      },

      stream: false,
    });

    const params = {
      headers: {
        "Content-Type": "application/json",

        ...(env.ollamaApiKey && {
          Authorization: `Bearer ${env.ollamaApiKey}`,
        }),
      },
    };

    return http.post(`${baseUrl}/api/chat`, payload, params);
  }

  return {
    chat,
  };
}
