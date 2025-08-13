import { Module } from '@nestjs/common';
import { IndustryController } from './industry.controller';
import { IndustryService } from './industry.service';
import { PrismaService } from '../lib/prisma/prisma.service';

@Module({
  controllers: [IndustryController],
  providers: [IndustryService, PrismaService],
})
export class IndustryModule {}
