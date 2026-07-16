import http from "k6/http";
import { sleep } from "k6";
import { createClient } from "../../../utils/ollamaClient.k6.js";
import { validateChatResponse } from "../../../utils/assertions.k6.js";
import { env } from "../../../utils/env.k6.js";

const ollamaModel = env.ollamaModel;
const maxVUs = env.isCI ? 80 : 20;

const client = createClient({
  local: true,
});

export const options = {
  stages: [{ duration: "2m", target: maxVUs }],
};

export default function () {
  const res = client.chat("What is 2 + 2?");

  validateChatResponse(res);
  sleep(1);
}
