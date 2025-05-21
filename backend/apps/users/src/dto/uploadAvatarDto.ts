import { IsNumber, IsString } from "class-validator";

export class UploadAvatarDto {
  @IsNumber()
  id: number;

  @IsString()
  photo: string;
}