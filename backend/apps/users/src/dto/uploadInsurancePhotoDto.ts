import { IsEmail, IsNumber, IsString } from "class-validator";

export class UploadInsurancePhotoDto {
  @IsNumber()
  id: number;

  @IsString()
  photo: string;
}