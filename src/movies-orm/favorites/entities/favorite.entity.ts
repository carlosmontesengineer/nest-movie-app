import { User } from 'src/auth/entities/user.entity';
import { Movie } from 'src/movies-orm/movies/entities/movie.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['user', 'movie'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.favorites)
  movie: Movie;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;
}
