import { IsNumber, IsString } from "class-validator";

export class SetMedicalDocumentExpirationDto {
  @IsNumber()
  id: number;

  @IsString()
  expires: string;
}