import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Place } from './models/place.model';
import { CreatePlaceDto } from './dto/createPlaceDto';
import { GetPlacesByIdDto } from './dto/getPlacesByIdDto';
import { Op } from 'sequelize';
import { DeletePlaceDto } from './dto/deletePlaceDto';
import { UploadPlacePhotoDto } from './dto/uploadPlacePhotoDto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ChangePlaceNameDto } from './dto/changePlaceNameDto';

@Injectable()
export class PlacesService {
  constructor(
    @InjectModel(Place) private placesRepository: typeof Place,
    @Inject("GROUPS") private groupsClient: ClientProxy,
  ) { }

  async getPlaces() {
    const places = await this.placesRepository.findAll();
    return places;
  }

  async getPlacesById(dto: GetPlacesByIdDto) {
    const places = await this.placesRepository.findAll({ where: { [Op.or]: dto.placesId.map(id => ({ id })) }, include: { all: true } });
    return places;
  }

  async createPlace(dto: CreatePlaceDto) {
    const place = await this.placesRepository.create(dto);
    return place;
  }

  async uploadPlacePhoto(dto: UploadPlacePhotoDto) {
    await this.placesRepository.update({ photo: dto.photo }, { where: { id: dto.id } });
    return await this.placesRepository.findOne({ where: { id: dto.id }, include: { all: true } });
  }

  async changePlaceName(dto: ChangePlaceNameDto) {

    const placeFromDb = await this.placesRepository.findOne({ where: { id: dto.id } });

    if (!placeFromDb) {
      return new BadRequestException("Такого места не существует");
    }

    await this.placesRepository.update({ name: dto.name }, { where: { id: dto.id } });
    return await this.placesRepository.findOne({ where: { id: dto.id } });
  }

  async deletePlace(dto: DeletePlaceDto) {

    const isPlaceBeingUsed = await lastValueFrom(this.groupsClient.send("is-place-being-used", { placeId: dto.id }));

    if (isPlaceBeingUsed) {
      return new BadRequestException("Невозможно удалить место, т.к. оно используется для проведения тренировок");
    }

    const place = await this.placesRepository.destroy({ where: { id: dto.id } });
    return place;
  }
}
