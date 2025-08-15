import { Module } from '@nestjs/common';
import { KeyResultService } from './key-result.service';
import { KeyResultController } from './key-result.controller';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [KeyResultController],
  providers: [KeyResultService, PrismaService],
})
export class KeyResultModule {}
