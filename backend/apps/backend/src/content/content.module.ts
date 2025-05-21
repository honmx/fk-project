import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { FileModule, FileService, HelpersModule, HelpersService, RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({ name: "CONTENT" }),
    FileModule,
    HelpersModule
  ],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule { }
