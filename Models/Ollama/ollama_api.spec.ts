import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { env } from '../../utils/env';

const apiKey = env.ollamaApiKey;
dotenv.config();

test('Ollama responds', async ({ request }) => {
    
    const response = await request.post(
        'http://localhost:11434/api/generate',
        {
            timeout: 60000, // 60 seconds,
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            data: {
                model: 'gemma3:1b',
                prompt: 'What is 2+2?',
                stream: false
            }
        }
    );
    
    await expect(apiKey).toBeDefined();
    await expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('apiKey:', apiKey);
    console.log(body);

    await expect(body.response).toContain('4');
});