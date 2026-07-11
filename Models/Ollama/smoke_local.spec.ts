import { test, expect } from '@playwright/test';

test('Ollama responds', async ({ request }) => {
    // const apiKey = (globalThis as any).process?.env?.OLLAMA_API_KEY;
    // expect(apiKey).toBeDefined();

    const response = await request.post(
        'http://localhost:11434/api/generate',
        {
            timeout: 60000, // 60 seconds,
            // headers: {
            //     'Authorization': `Bearer ${apiKey}`
            // },
            data: {
                model: 'gemma3:1b',
                prompt: 'What is 2+2?',
                stream: false
            }
        }
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();

    console.log(body);

    expect(body.response).toContain('4');
});