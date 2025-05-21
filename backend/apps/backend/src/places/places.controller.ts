import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/createPlaceDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePlaceNameDto } from './dto/changePlaceNameDto';

@Controller("places")
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @Get("/")
  async getPlaces() {
    return await this.placesService.getPlaces();
  }

  @Post("/")
  @UseInterceptors(FileInterceptor("photo"))
  async createPlace(@Body() createPlaceDto: CreatePlaceDto, @UploadedFile() photo: Express.Multer.File) {
    return await this.placesService.createPlace(createPlaceDto, photo);
  }

  @Patch("/:id/uploadPhoto")
  @UseInterceptors(FileInterceptor("photo"))
  async uploadPlacePhoto(@Param("id") id: number, @UploadedFile() photo: Express.Multer.File) {
    return await this.placesService.uploadPlacePhoto(id, photo);
  }

  @Patch("/:id/changeName")
  async changePlaceName(@Body() changePlaceNameDto: ChangePlaceNameDto, @Param("id") id: number) {
    return await this.placesService.changePlaceName(id, changePlaceNameDto);
  }

  @Delete("/:id")
  async deletePlace(@Param("id") id: number) {
    return await this.placesService.deletePlace(id);
  }
}
