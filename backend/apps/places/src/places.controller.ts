import { Controller } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CreatePlaceDto } from './dto/createPlaceDto';
import { GetPlacesByIdDto } from './dto/getPlacesByIdDto';
import { DeletePlaceDto } from './dto/deletePlaceDto';
import { UploadPlacePhotoDto } from './dto/uploadPlacePhotoDto';
import { ChangePlaceNameDto } from './dto/changePlaceNameDto';

@Controller()
export class PlacesController {
  constructor(
    private readonly placesService: PlacesService,
    private readonly rmqService: RmqService
  ) { }

  @MessagePattern("get-places")
  async getPlaces(@Ctx() context: RmqContext) {
    const response = await this.placesService.getPlaces();
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("get-places-by-id")
  async getPlacesById(@Payload() dto: GetPlacesByIdDto, @Ctx() context: RmqContext) {
    const response = await this.placesService.getPlacesById(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("create-place")
  async createPlace(@Payload() dto: CreatePlaceDto, @Ctx() context: RmqContext) {
    const response = await this.placesService.createPlace(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("upload-place-photo")
  async uploadPlacePhoto(@Payload() dto: UploadPlacePhotoDto, @Ctx() context: RmqContext) {
    const response = await this.placesService.uploadPlacePhoto(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("change-place-name")
  async changePlaceName(@Payload() dto: ChangePlaceNameDto, @Ctx() context: RmqContext) {
    const response = await this.placesService.changePlaceName(dto);
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("delete-place")
  async deletePlace(@Payload() dto: DeletePlaceDto, @Ctx() context: RmqContext) {
    const response = await this.placesService.deletePlace(dto);
    this.rmqService.ack(context);
    return response;
  }
}
