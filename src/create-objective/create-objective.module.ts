// src/create-objective/create-objective.module.ts
import { Module } from '@nestjs/common';
import { CreateObjectiveService } from './create-objective.service';
import { CreateObjectiveController } from './create-objective.controller';

@Module({
  providers: [CreateObjectiveService],
  controllers: [CreateObjectiveController],
})
export class CreateObjectiveModule {}
