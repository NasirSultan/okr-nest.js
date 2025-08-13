import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';   // <-- add this import

@Injectable()
export class StrategyService {
  constructor(private prisma: PrismaService) {}

  async addStrategy(title: string, file: Express.Multer.File) {
    if (!title || !file) throw new BadRequestException('Title and file are required');

    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = Date.now() + '-' + file.originalname;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, file.buffer);

    return this.prisma.strategy.create({
      data: { title, fileUrl: `/uploads/${fileName}` },
    });
  }

  async getRandomStrategy() {
    const strategies = await this.prisma.strategy.findMany();
    if (!strategies.length) throw new NotFoundException('No strategies found');

    const randomIndex = Math.floor(Math.random() * strategies.length);
    return strategies[randomIndex];
  }
}
