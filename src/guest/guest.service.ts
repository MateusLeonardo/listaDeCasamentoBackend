import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class GuestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { id, guestId }: User,
    { telefone, isConfirmed }: CreateGuestDto,
  ) {
    if (guestId) {
      throw new BadRequestException('Guest alread exists');
    }
    return this.prisma.guests.create({
      data: {
        User: {
          connect: {
            id,
          },
        },
        telefone,
        isConfirmed,
      },
    });
  }

  findAll() {
    return this.prisma.guests.findMany();
  }

  async findOne(id: string) {
    const guestExists = await this.prisma.guests.findFirst({
      where: {
        id,
      },
    });
    if (!guestExists) {
      throw new BadRequestException('Guest not found');
    }
    return this.prisma.guests.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, { telefone, isConfirmed }: UpdateGuestDto) {
    const guestExists = await this.prisma.guests.findFirst({
      where: {
        id,
      },
    });
    if (!guestExists) {
      throw new BadRequestException('Guest not found');
    }
    return this.prisma.guests.update({
      where: {
        id,
      },
      data: {
        isConfirmed,
        telefone,
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    return this.prisma.guests.delete({
      where: {
        id,
      },
    });
  }

  async getProfile(guestId: string) {
    const guest = await this.prisma.guests.findFirst({
      where: {
        id: guestId,
      },
      include: {
        companions: true,
      },
    });

    if (!guest) {
      throw new BadRequestException('Guest not found');
    }

    return guest;
  }

  async exists(id: string) {
    const guest = await this.prisma.guests.findFirst({
      where: {
        id,
      },
    });

    if (!guest) {
      throw new NotFoundException();
    }

    return guest;
  }
}
