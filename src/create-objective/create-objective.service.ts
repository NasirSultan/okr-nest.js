import { Injectable } from '@nestjs/common';
import { llm } from '../lib/llm/llm';
import { okrPrompt } from '../lib/prompt/createObjective';

@Injectable()
export class CreateObjectiveService {
  async generateObjectives(strategy: string, role: string, industry: string) {
    const prompt = okrPrompt(strategy, role, industry);

    const response = await llm.call([{ role: 'user', content: prompt }]);
    let text = response.text;

    // Remove ```json and ``` code fences if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const data = JSON.parse(text);
      return data;
    } catch (err) {
      // fallback if parsing fails
      return { error: 'Failed to parse LLM response', raw: text };
    }
  }
}
