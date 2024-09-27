import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(guestId: string, createCompanionDto: CreateCompanionDto) {
    return this.prisma.companions.create({
      data: {
        ...createCompanionDto,
        guest: {
          connect: {
            id: guestId,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.companions.findMany();
  }

  async findOne(id: string) {
    await this.exists(id);
    return this.prisma.companions.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCompanionDto: UpdateCompanionDto) {
    await this.exists(id);
    return this.prisma.companions.update({
      where: {
        id,
      },
      data: updateCompanionDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} companion`;
  }

  async exists(id: string) {
    const companion = await this.prisma.companions.findFirst({
      where: {
        id,
      },
    });

    if (!companion) {
      throw new NotFoundException();
    }

    return companion;
  }
}
