import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';
import { CreateNewsDto } from './dto/createNewsDto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News) private newsRepository: typeof News
  ) { }

  async getNews() {
    const news = await this.newsRepository.findAll();
    return news;
  }

  async createNews(dto: CreateNewsDto) {
    const news = await this.newsRepository.create(dto);
    return news;
  }
}
