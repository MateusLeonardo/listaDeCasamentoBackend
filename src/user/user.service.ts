import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, email, password }: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

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
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, { password, ...updateUserDto }: UpdateUserDto) {
    await this.exists(id);
    if (password) {
      const passwordHashed = await bcrypt.hash(
        password,
        await bcrypt.genSalt(),
      );
      password = passwordHashed;
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        password,
        ...updateUserDto,
      },
    });
  }

  async remove(id: string) {
    await this.exists(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async exists(id: string) {
    const user = await this.prisma.user.count({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
