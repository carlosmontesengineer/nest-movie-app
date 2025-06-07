import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class FavoritesService {
  private readonly logger = new Logger('FavoritesService');

  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private readonly movieService: MoviesService
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto, userId: string) {
    try {
      //Crear pelicula si no existe
      const movie = await this.movieService.findOne(createFavoriteDto.imdbID);

      if (!movie) {
          throw new NotFoundException(`Movie with imdbID: ${createFavoriteDto.imdbID} not found in database`);
      }

      const favorite = this.favoriteRepository.create({
        ...createFavoriteDto,
        movie: { id: createFavoriteDto.movieId },
        user: { id: userId },
      });
      await this.favoriteRepository.save(favorite);
      return favorite;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(id: string) {
    const favorites = await this.favoriteRepository.find({
      where: { user: { id } },
      relations: ['movie', 'user'],
    });

    if (favorites.length === 0)
      throw new NotFoundException('User has no favorites');

    return favorites;
  }

  async findOne(id: string) {
    try {
      const favorite = await this.favoriteRepository.findOneOrFail({
        where: { id },
      });
      return favorite;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateFavoriteDto: UpdateFavoriteDto) {
    const favorite = await this.favoriteRepository.preload({
      id: id,
      ...updateFavoriteDto,
    });

    if (!favorite)
      throw new NotFoundException(`Movie with id: ${id} not found`);

    try {
      await this.favoriteRepository.save(favorite);
      return favorite;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const favorite = await this.findOne(id);
    await this.favoriteRepository.remove(favorite);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error)

    if (error.status === 404) throw new NotFoundException(error.response.message)
  
    throw new InternalServerErrorException(
      'Unexpected error, check server logs'
    );
  }
}
