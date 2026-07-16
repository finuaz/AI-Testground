# AI Testground

> A quality engineering framework for AI-powered applications.

AI Testground provides a structured environment for validating AI systems through automated functional, regression, and performance testing. Built around Playwright, Ollama, and k6, it helps engineers verify response quality, consistency, latency, and reliability using reproducible test suites.

![GitHub Actions](...)
![Playwright](...)
![TypeScript](...)
![Docker](...)
![License](...)

---

## 📖 Table of Contents

- Overview
- Why AI Testground?
- Key Features
- Architecture
- Tech Stack
- Project Structure
- Getting Started
- Running Tests
- Performance Testing
- Continuous Integration
- Reports
- Roadmap
- Contributing
- License

## ✨ Overview

Traditional QA tools excel at testing web and mobile applications, but evaluating Large Language Models introduces new challenges such as response consistency, hallucinations, prompt regressions, and performance under load.

AI Testground addresses these challenges by providing a reusable testing framework that combines automated functional testing, API validation, and performance benchmarking into a single workflow.

The framework is designed for local-first development using Ollama, while remaining extensible to cloud-hosted LLM providers in the future.

## 🎯 Why AI Testground?

Modern AI applications require more than checking whether an API returns a response.

This project demonstrates practical quality engineering techniques for LLM-powered systems, including:

- Detecting prompt regressions
- Validating structured responses
- Measuring latency and throughput
- Ensuring response consistency
- Building reproducible automated test suites
- Integrating AI testing into CI/CD pipelines

The project serves both as a learning platform and a reusable QA framework for AI applications.

## ✨ Features

### Functional Testing

- Prompt validation
- API endpoint testing
- Response schema validation
- Error handling verification

### AI Quality Testing

- Response consistency checks
- Regression detection
- Prompt behavior validation
- Local LLM evaluation with Ollama

### Performance Testing

- Latency measurement
- Concurrent request testing
- Load testing with k6

### Engineering

- Playwright test framework
- Docker support
- GitHub Actions CI/CD
- TypeScript implementation

## 🛠 Tech Stack

| Category         | Technologies   |
| ---------------- | -------------- |
| Language         | TypeScript     |
| Automation       | Playwright     |
| Performance      | k6             |
| AI Runtime       | Ollama         |
| Models           | Gemma 3        |
| Containerization | Docker         |
| CI/CD            | GitHub Actions |

## Project Structure

AI-Testground
├── tests/
├── models/
├── performance/
├── utils/
├── docker/
├── .github/
└── README.md

## 📊 Reports

Playwright automatically generates HTML reports after each test execution.

k6 produces performance metrics including:

- Response Time
- Requests per Second
- Error Rate
- Throughput

Future versions will include consolidated dashboards and trend analysis.

## 🛣 Roadmap

- [x] Playwright automation
- [x] Ollama integration
- [x] Docker support
- [x] GitHub Actions
- [x] k6 performance testing

### Planned

- [ ] JSON Schema validation
- [ ] Multi-model comparison
- [ ] Prompt dataset management
- [ ] Visual reporting dashboard
- [ ] Cloud LLM support
- [ ] Security testing
- [ ] RAG evaluation
