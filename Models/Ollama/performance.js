import http from "k6/http";
import { sleep, check } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
};

export default function () {
    const payload = JSON.stringify({
        model: "gemma3:1b",
        prompt: "What is 2+2?",
        stream: false
    });

    const res = http.post(
        "http://localhost:11434/api/generate",
        payload,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    console.log(res.timings.duration);
    check(res, { "status is 200": (res) => res.status === 200 });
    sleep(1);
}