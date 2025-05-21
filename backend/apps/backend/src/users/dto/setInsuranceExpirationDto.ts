import { IsString } from "class-validator";

export class SetInsuranceExpirationDto {
  @IsString()
  expires: string;
}