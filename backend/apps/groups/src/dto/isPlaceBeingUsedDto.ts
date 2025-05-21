import { IsNumber, IsString } from "class-validator";

export class IsPlaceBeingUsedDto {
  @IsNumber()
  placeId: number;
}