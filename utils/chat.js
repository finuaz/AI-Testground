export function chat(
  prompt,
  {
    model = env.ollamaModel,

    temperature = 0,
  } = {}
) {
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

  return http.post(`${env.ollamaUrl}/api/chat`, payload, params);
}
