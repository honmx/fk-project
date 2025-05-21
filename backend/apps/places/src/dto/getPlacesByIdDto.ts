import { IsArray, IsString } from "class-validator";

export class GetPlacesByIdDto { 
  @IsArray()
  placesId: number[];
}