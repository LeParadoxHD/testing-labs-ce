import { IsBoolean, IsDefined, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { alphanumericRegex } from "src/utils/regex";

export class VariableDto {

    @IsDefined()
    @IsString()
    @Matches(alphanumericRegex)
    @MinLength(3)
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    value: string;

    @IsDefined()
    @IsBoolean()
    encrypted: boolean;

}