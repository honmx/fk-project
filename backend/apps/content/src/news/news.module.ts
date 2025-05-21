import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { RmqModule } from '@app/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './news.model';

@Module({
  imports: [
    RmqModule,
    SequelizeModule.forFeature([News])
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
