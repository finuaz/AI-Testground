# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Models\Ollama\safety.spec.ts >> Ollama responds
- Location: Models\Ollama\safety.spec.ts:8:5

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:11434
Call log:
  - → POST http://localhost:11434/api/generate
    - user-agent: Playwright/1.61.1 (x64; windows 10.0) node/24.11
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer fce6bd437d014ab8bdd73e5eea642398.-YJ6sSyA63Yoxquta7LwLnqF
    - content-type: application/json
    - content-length: 92

```