import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { llm } from '../lib/llm/llm';
import { okrPrompt } from '../lib/prompt/createObjective';

@Injectable()
export class CreateObjectiveService {
  private fetchCount = 0; // global counter for getObjectives

  constructor(private prisma: PrismaService) {}

  // Generate OKRs and save them in the database
  async generateAndSaveObjectives(
    strategyId: number,
    strategy: string,
    role: string,
    industry: string,
  ) {
    let attempt = 0;
    let objectivesData: string[] = [];

    while (attempt < 3 && objectivesData.length === 0) {
      attempt++;
      const prompt = okrPrompt(strategy, role, industry);

      const response = await llm.call([{ role: 'user', content: prompt }]);
      let text = response.text;

      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      try {
        const data = JSON.parse(text);
        objectivesData = data.okrs || [];
      } catch (err) {
        // continue to retry
      }
    }

    if (objectivesData.length === 0) {
      return { error: 'Failed to generate OKRs after 3 attempts' };
    }

    // Delete old objectives if strategy already exists
    await this.prisma.objective.deleteMany({
      where: { strategy_id: strategyId },
    });

    // Insert new objectives
    const createData = objectivesData.map((title) => ({
      strategy_id: strategyId,
      title,
    }));

    await this.prisma.objective.createMany({
      data: createData,
    });

    // Fetch the newly created objectives to return
    const savedObjectives = await this.prisma.objective.findMany({
      where: { strategy_id: strategyId },
      orderBy: { id: 'asc' },
    });

    return { message: 'Objectives saved', objectives: savedObjectives };
  }

  // Fetch objectives with a global limit of 3 times
  async getObjectives(strategyId?: number) {
    if (this.fetchCount >= 3) {
      return { error: 'Fetch limit reached (3 times only)' };
    }

    this.fetchCount++; // increment global fetch counter

    const query = {
      orderBy: { id: 'asc' as const },
    };

    if (strategyId) {
      return this.prisma.objective.findMany({
        ...query,
        where: { strategy_id: strategyId },
      });
    }

    return this.prisma.objective.findMany(query);
  }
}
