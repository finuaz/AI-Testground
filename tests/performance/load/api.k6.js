import http from "k6/http";
import { sleep, check } from "k6";
import { env } from "../../../utils/env.k6.ts";

const ollamaModel = env.ollamaModel;
const ollamaUrl = env.ollamaUrl;
const apiKey = env.ollamaApiKey;
const maxVUs = env.isCI ? 80 : 20;

export const options = {
  stages: [
  { duration: '2m', target: maxVUs },
]};

export default function () {
  const ollama = new Ollama({
      host: ollamaUrl,
      headers: {
        Authorization: "Bearer " + apiKey,
      },
    });
  
    const response = await ollama.chat({
      model: ollamaModel,
      messages: [{ role: "user", content: "What is 2+2?" }],
      stream: false,
    });

//   console.log(res.timings.duration);
//   console.log(res.status);
//   console.log(res.body);
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
