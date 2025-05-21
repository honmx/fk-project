import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePlaceDto } from './dto/createPlaceDto';
import { FileService, HelpersService } from '@app/common';
import { ChangePlaceNameDto } from './dto/changePlaceNameDto';

@Injectable()
export class PlacesService {
  constructor(
    @Inject("PLACES") private placesClient: ClientProxy,
    private readonly fileService: FileService,
    private readonly helpersService: HelpersService
  ) { }

  async getPlaces() {
    const response = await lastValueFrom(this.placesClient.send("get-places", {}));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async createPlace(createPlaceDto: CreatePlaceDto, photo: Express.Multer.File) {
    const uploadedPhoto = await this.fileService.uploadFile(
      photo,
      "places",
      photo.originalname
    );

    const response = await lastValueFrom(
      this.placesClient.send(
        "create-place",
        { photo: uploadedPhoto.Location, ...createPlaceDto }
      )
    );

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async uploadPlacePhoto(id: number, photo: Express.Multer.File) {
    const uploadedPhoto = await this.fileService.uploadFile(
      photo,
      "places",
      this.helpersService.hash({ id, value: photo.originalname })
    );

    const response = await lastValueFrom(
      this.placesClient.send(
        "upload-place-photo",
        { id, photo: uploadedPhoto.Location }
      )
    );

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async changePlaceName(id: number, changePlaceNameDto: ChangePlaceNameDto) {
    const response = await lastValueFrom(this.placesClient.send("change-place-name", { id, ...changePlaceNameDto }));

    if (response?.status >= 400) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  async deletePlace(id: number) {
    const response = await lastValueFrom(this.placesClient.send("delete-place", { id }));

    if (response?.status >= 400 || !response) {
      throw new HttpException(response?.message || "Some error", response?.status || HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
