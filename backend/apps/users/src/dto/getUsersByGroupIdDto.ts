import { IsNumber } from "class-validator";

export class GetUsersByGroupIdDto {
  @IsNumber()
  groupId: number;
}