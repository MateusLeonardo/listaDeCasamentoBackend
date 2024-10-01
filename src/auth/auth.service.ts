import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayloadType } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateJwt(payload: JwtPayloadType) {
    return this.jwtService.sign(payload);
  }

  async validateJwt(token: string) {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException(`${err}: Token inválido`);
    }
  }

  async signIn(user: CreateUserDto) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.userService.findByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: CreateUserDto) {
    try {
      const userExists = await this.userService.findByEmail(user.email);
      if (userExists) {
        throw new ConflictException('User alread exists');
      }
      const newUser = await this.userService.create(user);

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
