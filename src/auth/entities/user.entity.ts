import { Favorite } from 'src/movies-orm/favorites/entities/favorite.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
  favorites?: Favorite[];

  @BeforeInsert()
  ChekFieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  ChekFieldsBeforeUpdate() {
    this.ChekFieldsBeforeInsert();
  }
}
