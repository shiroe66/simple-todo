import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { PrismaModule } from '@app/providers/database/prisma/prisma.module';
import { SessionSerializer } from './serializers';

@Module({
  imports: [PassportModule.register({ session: true }), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
