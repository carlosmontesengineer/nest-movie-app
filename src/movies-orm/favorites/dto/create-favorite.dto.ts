import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateFavoriteDto {

  @IsString()
  imdbID:string;
    
  @IsUUID()
  movieId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  comment?: string;

}
