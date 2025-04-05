import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  confirmPassword!: string;
}
