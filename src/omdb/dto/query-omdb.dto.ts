import { IsIn, IsNumberString, IsOptional, IsString, MinLength } from "class-validator";

export class QueryOmdbDto {

    @IsString()
    @MinLength(1)
    title:string;

    @IsNumberString()
    @IsOptional()
    page?:string;

    @IsIn(['movie','series','episode'])
    @IsOptional()
    type?:string;
}
