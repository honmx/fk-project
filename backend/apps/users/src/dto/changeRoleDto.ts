import { IsNumber, IsString } from "class-validator";

export class ChangeRoleDto {
  @IsNumber()
  id: number;

  @IsNumber()
  roleId: number;
}