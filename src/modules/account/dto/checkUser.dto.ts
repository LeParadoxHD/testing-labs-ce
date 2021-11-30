import { IsNotEmpty } from 'class-validator';

export class CheckUserDto {
    @IsNotEmpty() username: string;
}