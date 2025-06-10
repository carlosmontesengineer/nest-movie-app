import { IsIn , IsString, MinLength } from "class-validator";

export class CreateMovieDto {

    
      @IsString()
      @MinLength(1)
      title:string;
      
      @IsString()
      year:string;
    
      @IsString()
      imdbID: string;
    
      @IsIn(['movie','series','episode'])
      type: string;
    
      @IsString()
      poster:string;
}
