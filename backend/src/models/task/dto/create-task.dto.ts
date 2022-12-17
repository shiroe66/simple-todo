import { Status } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  title: string;

  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
