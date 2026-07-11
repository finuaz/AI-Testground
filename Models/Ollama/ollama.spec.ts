import { test, expect } from '@playwright/test';

test('Ollama responds', async ({ request }) => {

    const response = await request.post(
        'http://localhost:11434/api/generate',
        {
            timeout: 60000, // 60 seconds,
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