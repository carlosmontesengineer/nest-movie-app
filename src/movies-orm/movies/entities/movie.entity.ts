import { Favorite } from 'src/movies-orm/favorites/entities/favorite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    unique: true,
    length: 100,
  })
  title: string;

  @Column('varchar', {
    length: 15,
  })
  year: string;

  @Column('text', { unique: true })
  imdbID: string;

  @Column('varchar', { length: 20 })
  type: string;

  @Column('text')
  poster: string;

  @OneToMany(() => Favorite, (favorite) => favorite.movie, { cascade: true })
  favorites?: Favorite[];
}
