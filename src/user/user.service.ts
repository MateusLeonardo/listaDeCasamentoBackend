import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDto) {
    const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    await this.exists(id);
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: string, { password, ...updateUserDto }: UpdateUserDto) {
    await this.exists(id);
    const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: passwordHashed,
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: string) {
    const user = await this.prisma.user.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }
  }
}
