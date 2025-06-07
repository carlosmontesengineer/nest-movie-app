import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MoviesModule } from '../movies/movies.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports:[ AuthModule, MoviesModule, TypeOrmModule.forFeature([Favorite])]
})
export class FavoritesModule {}
