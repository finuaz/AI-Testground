import http from "k6/http";
import { sleep, check } from "k6";
import { env } from "../../../utils/env.k6.ts";

const ollamaModel = env.ollamaModel;
const ollamaUrl = env.ollamaUrl;
const apiKey = env.ollamaApiKey;
const maxVUs = env.isCI ? 80 : 20;

export const options = {
  stages: [{ duration: "2m", target: maxVUs }],
};

export default async function () {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  const res = http.post(`${ollamaUrl}/api/chat`, payload, { headers });

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
