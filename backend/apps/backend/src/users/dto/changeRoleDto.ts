import { IsNumber, IsString } from "class-validator";

export class ChangeRoleDto {
  @IsNumber()
  roleId: number;
}