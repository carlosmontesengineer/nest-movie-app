import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @GetUser('id') userId: string,
    @Body() createFavoriteDto: CreateFavoriteDto
  ) {
    return this.favoritesService.create(createFavoriteDto, userId);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@GetUser('id') id: string) {
    return this.favoritesService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto
  ) {
    return this.favoritesService.update(id, updateFavoriteDto);
  }

  @Get('coments/:id')
  getComentsByMovieId(@Param('id') id: string) {
    return this.favoritesService.getComments(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(id);
  }
}
