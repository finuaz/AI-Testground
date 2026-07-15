import http from "k6/http";
import { sleep, check } from "k6";
import { env } from "../../utils/env.k6.ts";

const ollamaModel = env.ollamaModel;

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 5 },
        { duration: '30s', target: 10 },
        { duration: '30s', target: 20 },
        { duration: '30s', target: 30 },
        { duration: '30s', target: 40 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 60 },
      ]
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
