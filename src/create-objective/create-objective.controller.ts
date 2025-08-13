// src/create-objective/create-objective.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateObjectiveService } from './create-objective.service';

@Controller('create-objective')
export class CreateObjectiveController {
  constructor(private readonly createObjectiveService: CreateObjectiveService) {}

  @Post('generate')
  async generate(@Body() body: { strategy: string; role: string; industry: string }) {
    const { strategy, role, industry } = body;
    const result = await this.createObjectiveService.generateObjectives(strategy, role, industry);
    return { objectives: result };
  }
}
