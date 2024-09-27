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

  findOne(id: number) {
    return `This action returns a #${id} companion`;
  }

  async update(id: string, updateCompanionDto: UpdateCompanionDto) {
    const companion = await this.prisma.companions.findFirst({
      where: {
        id,
      },
    });
    if (!companion) {
      throw new NotFoundException();
    }
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
}
