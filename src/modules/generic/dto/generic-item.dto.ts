import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsOptional, Matches, ValidateNested } from "class-validator";
import { VariableDto } from "src/modules/variables/dto/variable.dto";
import { nameRegex } from "src/utils/regex";

export class GenericItemDto {

    @IsOptional()
    @Matches(nameRegex)
    name: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMaxSize(100) // This may change in the future
    @Type(() => VariableDto)
    variables?: VariableDto[];

}