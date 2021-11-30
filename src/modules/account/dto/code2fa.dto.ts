import { IsNotEmpty, IsNumberString, Length } from "class-validator";

export class Code2faDto {
    @IsNotEmpty()
    @IsNumberString()
    @Length(6, 6)
    code: string;
}