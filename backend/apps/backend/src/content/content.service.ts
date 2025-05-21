import { FileService, HelpersService } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCoachDto } from './dto/createCoachDto';
import { lastValueFrom } from "rxjs";
import { CreateNewsDto } from './dto/createNewsDto';

@Injectable()
export class ContentService {
  constructor(
    @Inject("CONTENT") private contentClient: ClientProxy,
    private readonly fileService: FileService,
    private readonly helpersService: HelpersService
  ) { }

  async getCoaches() {
    const response = await lastValueFrom(this.contentClient.send("get-coaches", {}));
    return response;
  }

  async createCoach(coachDto: CreateCoachDto, photo: Express.Multer.File) {
    const uploadedPhoto = await this.fileService.uploadFile(
      photo,
      "coaches",
      this.helpersService.hash(this.helpersService.pick(["type", "name", "birth"], coachDto))
    );

    const response = await lastValueFrom(
      this.contentClient.send(
        "create-coach",
        { photo: uploadedPhoto.Location, ...coachDto }
      )
    );

    return response;
  }

  async getNews() {
    const response = await lastValueFrom(this.contentClient.send("get-news", {}));
    return response;
  }

  async createNews(newsDto: CreateNewsDto, photos: Express.Multer.File[]) {
    const uploadedPhotos = await this.fileService.uploadFiles(
      photos,
      "news",
      photos.map((photo, i) =>
        this.helpersService.hash(this.helpersService.pick(["title"], newsDto)) + i
      )
    );

    const response = await lastValueFrom(
      this.contentClient.send(
        "create-news",
        { photos: uploadedPhotos.map(photo => photo.Location), ...newsDto }
      )
    );

    return response;
  }
}
