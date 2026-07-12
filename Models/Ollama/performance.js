import http from "k6/http";
import { sleep, check } from "k6";
import dotenv from "dotenv";
import { env } from "../../utils/env";
import { Ollama } from "ollama";

const apiKey = env.ollamaApiKey;
const ollamaModel = env.ollamaModel;
dotenv.config();
// import { spawn } from "child_process";

// spawn("ollama", ["serve"], {
//     detached: true,
//     stdio: "ignore",
// }).unref();

export const options = {
  vus: 5,
  duration: "15s",
};

export default function () {
  const payload = JSON.stringify({
    model: ollamaModel,
    prompt: "What is 2+2?",
    stream: false,
  });

  const res = http.post("http://localhost:11434/api/generate", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res.timings.duration);
  console.log(res.status);
  console.log(res.body);
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
