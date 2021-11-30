import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { alphanumericRegex } from 'src/utils/regex';

export class SignupDto {
    @IsNotEmpty() name: string;

    @IsNotEmpty()
    @Matches(alphanumericRegex)
    @MinLength(5)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsNotEmpty() @IsEmail() email: string;
}