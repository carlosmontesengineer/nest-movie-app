import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies-orm/movies/movies.module';
import { FavoritesModule } from './movies-orm/favorites/favorites.module';
import { OmdbModule } from './omdb/omdb.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER ,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      synchronize: true, //en produccion no se usa (poner en false)
    }),
    AuthModule,
    MoviesModule,
    FavoritesModule,
    OmdbModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
