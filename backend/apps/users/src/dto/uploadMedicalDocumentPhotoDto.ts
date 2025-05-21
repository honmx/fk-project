import { IsEmail, IsNumber, IsString } from "class-validator";

export class UploadMedicalDocumentPhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  photo: string;
}