import { IsArray } from "class-validator";

export class GetUsersByIdDto {
  @IsArray()
  usersId: number[];
}