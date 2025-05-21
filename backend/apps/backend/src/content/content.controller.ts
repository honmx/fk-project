import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateCoachDto } from './dto/createCoachDto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateNewsDto } from './dto/createNewsDto';

@Controller("content")
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Get("/coaches")
  async getCoaches() {
    return await this.contentService.getCoaches();
  }

  @Post("/coach")
  @UseInterceptors(FileInterceptor("photo"))
  async createCoach(
    @UploadedFile() photo: Express.Multer.File,
    @Body() coachDto: CreateCoachDto
  ) {
    return await this.contentService.createCoach(coachDto, photo);
  }

  @Get("/news")
  async getNews() {
    return await this.contentService.getNews();
  }

  @Post("/news")
  @UseInterceptors(FilesInterceptor("photos"))
  async createNews(
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() newsDto: CreateNewsDto
  ) {
    return await this.contentService.createNews(newsDto, photos);
  }
}
