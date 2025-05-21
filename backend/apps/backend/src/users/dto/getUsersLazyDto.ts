import { IsEmail, IsString } from "class-validator";

export class GetUsersLazyDto { 
  offset: number;
  name: string;
  filterId: number;
}