import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: "<OPENROUTER_API_KEY>",
  httpReferer: "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
  appTitle: "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
});

const completion = await client.chat.send({
  model: "~openai/gpt-latest",
  messages: [
    {
      role: "user",
      content: "What is the meaning of life?",
    },
  ],
});

console.log(completion.choices[0].message.content);
