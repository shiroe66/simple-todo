import { PrismaService } from '@app/providers/database/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async findOne(username: string) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    return user;
  }

  async signup({ username, password }: RegisterDto) {
    const user = await this.findOne(username);
    if (user) {
      throw new ConflictException();
    }

    const hashPassword = await argon2.hash(password);
    return this.prismaService.user.create({
      data: { username, password: hashPassword },
      select: { id: true, username: true },
    });
  }

  async signin({ username, password }: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = argon2.verify(user.password, password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return { username: user.username, id: user.id };
  }
}
