import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { krPrompt } from '../lib/prompt/createKeyResult';

@Injectable()
export class CreateKeyResultService {
  async generateKeyResults(strategy: string, objective: string, role: string) {
    const prompt = krPrompt(strategy, objective, role);

    // Wrap prompt in chat-style message (array) for LLM
    const messages = [{ role: 'user', content: prompt }];

    // Call LLM
    const response = await llm.call(messages);

    // Extract text safely
    const text = 'text' in response ? response.text : response;

    // Log raw response for debugging
    console.log('LLM Raw Response:', text);

    // Extract JSON from response (safe parsing)
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('No JSON found in LLM response');
    }

    try {
      const parsed = JSON.parse(match[0]);
      return parsed;
    } catch (err) {
      throw new Error('Failed to parse Key Results JSON from LLM');
    }
  }
}
