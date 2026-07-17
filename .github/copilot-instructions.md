# Copilot Instructions for AI Testground

## Quick Reference

### Test Commands

- **Run all tests**: `npm test`
- **Run tests with UI**: `npm test -- --ui`
- **Run tests in debug mode**: `npm test -- --debug`
- **Run tests headed (visible browser)**: `npm test -- --headed`
- **Run single test file**: `npm test -- tests/smoke/local.spec.ts`
- **Run tests matching pattern**: `npm test -- --grep "pattern"`
- **View last test report**: `npm run report`

### Code Quality

- **Lint**: `npm run lint`
- **Fix linting issues**: `npm run lint:fix`
- **Check formatting**: `npm run format:check`
- **Format code**: `npm run format`
- **Full validation (format + lint + tests)**: `npm run check`
- **CI validation**: `npm run check:ci` (uses dot reporter)

### Performance Testing

- **Run k6 performance tests**: `sh k6runner.sh`
- **Run single k6 test**: `k6 run ./tests/performance/{category}/{type}.k6.js`
  - Example: `k6 run ./tests/performance/load/local.k6.js`

### Other

- **Generate Playwright tests**: `npm run codegen`
- **Start Ollama server**: `npm run ollama:start`
- **Docker validation**: `npm run docker:check`

## Architecture

### Test Organization

Tests are organized by testing type, not by feature:

```
tests/
├── smoke/              # Basic functionality verification
├── sdk/                # SDK-specific tests (Ollama, OpenRouter)
├── api/                # API endpoint tests
├── ui/                 # Browser UI automation tests
├── streaming/          # Streaming response tests
├── performance/        # k6-based performance benchmarks
│   ├── load/          # Load testing (sustained concurrent users)
│   ├── stress/        # Stress testing (increasing load to breaking point)
│   ├── spike/         # Spike testing (sudden traffic spikes)
│   ├── soak/          # Soak testing (prolonged runtime)
│   ├── volume/        # Volume testing (large data payloads)
│   ├── capacity/      # Capacity testing (maximum resource utilization)
│   ├── scalability/   # Scalability testing (horizontal scaling)
│   ├── smoke/         # Performance smoke tests
│   └── baseline-benchmark/  # Performance baseline metrics
├── prompt/            # Prompt behavior and consistency tests
├── regression/        # Regression detection tests
├── schema/            # Response schema validation tests
└── safety/            # Safety and security validation tests
```

### Provider Architecture

The codebase supports multiple AI provider backends:

**Ollama** (`providers/ollama.ts`):

- Local LLM execution
- Default in development (`http://localhost:11434`)
- CI environment: Uses remote Ollama instance
- Environment detection: `env.ts` checks `GITHUB_ACTIONS` to switch hosts
- Model configuration: Defaults to `gemma3:1b`, overridable via `OLLAMA_MODEL` env var

**OpenRouter** (`providers/openrouter.ts`):

- Cloud-based LLM provider
- Requires `OPENROUTER_API_KEY` environment variable
- Used in SDK tests for cloud model evaluation

### Testing Framework

- **Playwright**: Browser automation and end-to-end testing
  - Configuration: `playwright.config.ts`
  - Single worker (retries: 2) to prevent race conditions
  - 30-second timeout per test
  - HTML + list reporters
- **k6**: Performance and load testing
  - Separate test files per scenario type
  - Run via `k6runner.sh` shell script
  - Tests use local and API endpoints

## Key Conventions

### TypeScript Configuration

- **Target**: ES2022
- **Module**: CommonJS
- **Strict mode**: Enabled
- **Types**: Node + Playwright

### Code Formatting

- **Prettier** configuration in `.prettierrc`:
  - Print width: 100
  - Tab width: 2
  - Trailing comma: ES5
  - Single quotes: False (use double quotes)
  - Semicolons: Enabled
- **ESLint**: TypeScript-aware with Prettier integration
  - Base: JS recommended + TypeScript recommended
  - Global scope: Browser globals
  - Config: `eslint.config.js` (ESLint flat config format)

### Environment & Configuration

- **Environment file**: `.env` (not committed, contains local overrides)
- **Config module**: `utils/env.ts`
  - Loads via `dotenv.config()`
  - Auto-detects CI environment via `GITHUB_ACTIONS`
  - Provides `config`, `env`, and `OPENROUTER_API_KEY` exports
- **Common variables**:
  - `OLLAMA_URL`: Ollama endpoint (defaults based on CI detection)
  - `OLLAMA_API_KEY`: Ollama authentication
  - `OLLAMA_MODEL`: Model selection (default: `gemma3:1b`)
  - `OPENROUTER_API_KEY`: OpenRouter credentials

### Test File Naming & Structure

- Playwright tests: `*.spec.ts` (Playwright convention)
- k6 performance tests: `*.k6.js` (k6 convention, JavaScript not TypeScript)
- File structure mirrors test type: `tests/{category}/{name}.spec.ts` or `tests/performance/{type}/{name}.k6.js`

### Playwright Configuration Specifics

- **Base URL**: https://www.decathlon.co.id (configured for UI tests)
- **Locale**: id-ID (Indonesian)
- **Timezone**: Asia/Jakarta
- **Viewport**: 1280x720
- **Geolocation**: Jakarta coordinates (-7.3°, 109.9°)
- **Screenshots**: Only on failure, full page
- **Video/Trace**: Retained on failure
- **Color scheme**: Dark mode

### CI/CD Workflow

GitHub Actions workflow (`.github/workflows/playwright.yml`):

- Triggers: Push to `main`, PR to `main`, daily schedule (midnight UTC), manual dispatch
- Container: `mcr.microsoft.com/playwright:v1.61.1-noble`
- Node.js: v24 with npm caching
- Installs: Ollama, k6, zstd (compression)
- Test sequence:
  1. Install dependencies (`npm ci`)
  2. Install Ollama and pull model
  3. Run k6 tests (`sh k6runner.sh`)
  4. Run Playwright tests (`npm test`)
  5. Upload artifacts: `playwright-report/` (7-day retention)

## Shared State & Utilities

### Environment Utilities

Location: `utils/env.ts`

```typescript
// Exports
config; // Static configuration (Ollama host based on CI)
env; // Runtime environment variables
OPENROUTER_API_KEY; // Direct export for convenience
```

Use in tests:

```typescript
import { env, config, OPENROUTER_API_KEY } from "../utils/env";
```

### k6 Environment Integration

Location: `utils/env.k6.ts`

- Separate utilities for k6 JavaScript context (different from TypeScript Node.js)

## Adding Tests

### Playwright Test Template

1. Place in `tests/{category}/{name}.spec.ts`
2. Import environment: `import { env } from "../utils/env"`
3. Use Playwright's `test` function
4. Example:

```typescript
import { test, expect } from "@playwright/test";
import { env } from "../utils/env";

test("should validate response", async ({ request }) => {
  const response = await request.get(env.ollamaUrl);
  expect(response.status()).toBe(200);
});
```

### Performance Test Template

1. Place in `tests/performance/{type}/{name}.k6.js`
2. Use k6 HTTP module
3. Define `export let options = { ... }`
4. Define `export default function () { ... }`
5. Refer to existing k6 tests for pattern examples

## Debugging & Troubleshooting

### Local Setup

1. **Ollama**: Start with `npm run ollama:start` (runs on `http://localhost:11434`)
2. **Pull model**: `ollama pull gemma3:1b` (or override with `OLLAMA_MODEL`)
3. **Verify**: Check `utils/env.ts` and `.env` for configuration

### Test Debugging

- Use `npm test -- --debug` to step through code in Inspector
- Use `npm test -- --headed` to see browser window
- Use `npm test -- --ui` for Playwright Inspector with test picker
- Generated trace/video in test results when failures occur

### Common Issues

- **Ollama connection**: Verify Ollama is running on correct host (check `GITHUB_ACTIONS` detection)
- **Test timeouts**: Adjust in `playwright.config.ts` (global timeout: 30s, expect: 5s, action: 10s)
- **Environment vars**: Ensure `.env` file exists locally or vars are set system-wide
- **k6 tests**: Run individual test with `k6 run ./tests/performance/{path}` to isolate failures

## Docker Support

Build: `docker build -t ai-testground:latest .`
Run validation: `npm run docker:check`

The Dockerfile:

- Uses Playwright base image (v1.61.1)
- Installs dependencies with `npm ci`
- Sets `CI=true` environment variable
- Ready for CI/CD pipeline execution
