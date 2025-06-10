import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { QueryOmdbDto } from './dto/query-omdb.dto';

@Controller('omdb')
export class OmdbController {

  constructor(private readonly omdbService: OmdbService) {}

  @Post('searchByTitle')
  async search( @Body() queryOmdbDto: QueryOmdbDto) {
    return this.omdbService.searchMovieByTitle(queryOmdbDto);
  }
}
