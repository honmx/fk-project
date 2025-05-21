import { IsString } from "class-validator";

export class SetMedicalDocumentExpirationDto {
  @IsString()
  expires: string;
}