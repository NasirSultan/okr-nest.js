import { Controller, Post, Body } from '@nestjs/common';
import { CreateKeyResultService } from './create-key-result.service';

@Controller('key-result')
export class CreateKeyResultController {
  constructor(private readonly krService: CreateKeyResultService) {}

  @Post()
  async create(@Body() body: { strategy: string; objective: string; role: string }) {
    const { strategy, objective, role } = body;
    return await this.krService.generateKeyResults(strategy, objective, role);
  }
}
