import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanionDto } from './dto/create-companion.dto';
import { UpdateCompanionDto } from './dto/update-companion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(guestId: string | null, createCompanionDto: CreateCompanionDto) {
    if (guestId === null) {
      throw new NotFoundException('Guest not found');
    }
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

  async findAll() {
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

  async remove(id: string) {
    await this.exists(id);
    return this.prisma.companions.delete({
      where: {
        id,
      },
    });
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
