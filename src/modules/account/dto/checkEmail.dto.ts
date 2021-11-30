import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}