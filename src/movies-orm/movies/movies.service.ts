import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger('MoviesService');

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const movie = this.movieRepository.create(createMovieDto);
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }



  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const movies = await this.movieRepository.find({
      take: limit,
      skip: offset,
      //todo relaciones
    });

    const totalMovies = await this.movieRepository.count();

    return {
      count: totalMovies,
      pages: Math.ceil(totalMovies / limit),
      movies,
    };
  }

  async findOne(query: string) {
    let movie: Movie;

    if (isUUID(query)) {
      movie = await this.movieRepository.findOneBy({ id: query });
    } else {
      movie = await this.movieRepository.findOneBy({ imdbID: query });
    }
    return movie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.movieRepository.preload({
      id: id,
      ...updateMovieDto,
    });

    if (!movie) throw new NotFoundException(`Movie with id: ${id} not found`);

    try {
      await this.movieRepository.save(movie);
      return movie;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs'
    );
  }
}
