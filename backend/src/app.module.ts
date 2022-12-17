import { AuthModule } from '@app/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './models/task/task.module';

@Module({
  imports: [AuthModule, ConfigModule, TaskModule],
})
export class AppModule {}
