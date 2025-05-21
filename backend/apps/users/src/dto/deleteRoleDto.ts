import { IsNumber, IsString } from "class-validator";

export class DeleteRoleDto {
  @IsNumber()
  id: number;
}