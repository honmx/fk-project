import { IsNumber, IsString } from "class-validator";

export class UploadPlacePhotoDto { 
  @IsNumber()
  id: number;

  @IsString()
  photo: string;
}