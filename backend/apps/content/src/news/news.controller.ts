import { RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
import { NewsService } from './news.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateNewsDto } from './dto/createNewsDto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly rmqService: RmqService,
    private readonly newsService: NewsService
  ) {}

  @MessagePattern("get-news")
  async getNews(@Ctx() context: RmqContext) {
    const response = await this.newsService.getNews();
    this.rmqService.ack(context);
    return response;
  }

  @MessagePattern("create-news")
  async createNews(@Payload() dto: CreateNewsDto, @Ctx() context: RmqContext) {
    const response = await this.newsService.createNews(dto);
    this.rmqService.ack(context);
    return response;
  }
}
