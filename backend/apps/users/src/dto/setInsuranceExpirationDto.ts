import { IsNumber, IsString } from "class-validator";

export class SetInsuranceExpirationDto {
  @IsNumber()
  id: number;

  @IsString()
  expires: string;
}