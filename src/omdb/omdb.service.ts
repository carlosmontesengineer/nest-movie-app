import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { MovieSearchResponse } from 'src/interfaces/movies.interface';
import { QueryOmdbDto } from './dto/query-omdb.dto';

@Injectable()
export class OmdbService {
  private readonly apiKey: string = '47468f4c';
  private readonly baseUrl = 'http://www.omdbapi.com/';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async searchMovieByTitle(queryOmdDto: QueryOmdbDto) {
    const url = this.buildSearchUrl(queryOmdDto);

    try {
      const response$ = this.httpService.get<MovieSearchResponse>(url);
      const response = await lastValueFrom(response$);
      return response.data; // Puede contener { Search: [], totalResults: '', Response: 'True'/'False' }
    } catch (error) {
      throw new Error('Error al consultar OMDb: ' + error.message);
    }
  }

  async getMovieById(imdbID: string) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${imdbID}`;
    const response$ = this.httpService.get<MovieSearchResponse>(url);
    const response = await lastValueFrom(response$);
    return response.data;
  }

    private buildSearchUrl(query: QueryOmdbDto): string {
    const params = new URLSearchParams({
      apikey: this.apiKey,
      s: query.title,
    });

    if (query.page) {
      params.append('page', query.page);
    }

    if (query.type) {
      params.append('type', query.type);
    }

    return `${this.baseUrl}?${params.toString()}`;
  }
}
