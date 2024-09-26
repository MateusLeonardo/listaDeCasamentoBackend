import { Injectable } from '@nestjs/common';
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

  update(id: number, updateCompanionDto: UpdateCompanionDto) {
    return `This action updates a #${id} companion`;
  }

  remove(id: number) {
    return `This action removes a #${id} companion`;
  }
}
