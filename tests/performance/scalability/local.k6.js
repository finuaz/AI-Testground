import http from "k6/http";
import { sleep, check } from "k6";
import { env } from "../../../utils/env.k6.ts";

const ollamaModel = env.ollamaModel;
const maxVUs = env.isCI ? 80 : 20;

export const options = {
  scenarios: {
    contacts: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "20s", target: Math.round(maxVUs * 0.15) },
        { duration: "20s", target: Math.round(maxVUs * 0.3) },
        { duration: "20s", target: Math.round(maxVUs * 0.5) },
        { duration: "20s", target: Math.round(maxVUs * 0.8) },
        { duration: "20s", target: maxVUs },
      ],
    },
  },
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

  //   console.log(res.timings.duration);
  //   console.log(res.status);
  //   console.log(res.body);
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
