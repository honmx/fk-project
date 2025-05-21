import { IsNumber, IsString } from "class-validator";

export class DeletePlaceDto { 
  @IsNumber()
  id: number;
}