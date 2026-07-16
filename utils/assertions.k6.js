import { check } from "k6";

export function validateChatResponse(res) {
  return check(res, {
    "status == 200": (r) => r.status === 200,

    "response body exists": (r) => r.body.length > 0,

    "contains assistant message": (r) => {
      const body = JSON.parse(r.body);
      return body.message != null;
    },
  });
}
