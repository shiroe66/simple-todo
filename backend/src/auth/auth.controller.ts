import { GetUser } from '@app/common/decorators/request';
import { AuthenticatedGuard, LocalGuard } from '@app/common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.signup(registerDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async signin(
    @Body(ValidationPipe) loginDto: LoginDto,
    @GetUser() user: User,
  ) {
    return user;
  }

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  async profile(@Req() req: Request, @Res() res: Response) {
    console.log(req.cookies);
  }
}
