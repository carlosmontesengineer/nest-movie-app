import { Module } from '@nestjs/common';
import { OmdbService } from './omdb.service';
import { OmdbController } from './omdb.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [OmdbController],
  providers: [OmdbService],
  imports:[HttpModule,ConfigModule]
})
export class OmdbModule {}
