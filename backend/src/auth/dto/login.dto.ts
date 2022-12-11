import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
