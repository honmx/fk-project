import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import EasyYandexS3 from 'easy-yandex-s3';
import { IUploadedFile } from '../types/IUploadedFile';

@Injectable()
export class FileService {

  s3 = new EasyYandexS3({
    auth: {
      accessKeyId: this.configService.get<string>("YANDEX_CLOUD_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get<string>("YANDEX_CLOUD_SECRET_ACCESS_KEY"),
    },
    Bucket: "footykids-files-storage",
    debug: true
  });

  constructor(private readonly configService: ConfigService) { }

  async uploadFile(file: Express.Multer.File, folder = "", name?: string) {
    const buffer = file.buffer;
    const uploadedFile = await this.s3.Upload(
      {
        buffer,
        name: name || file.originalname
      },
      `/${folder}`
    ) as IUploadedFile;
    
    return uploadedFile;
  }

  async uploadFiles(files: Express.Multer.File[], folder = "", names?: string[]) {
    const uploadedFile = await this.s3.Upload(
      files.map((file, i) => ({
        buffer: file.buffer,
        name: names[i] || file.originalname
      })),
      `/${folder}`
    ) as IUploadedFile[];

    return uploadedFile;
  }
}
