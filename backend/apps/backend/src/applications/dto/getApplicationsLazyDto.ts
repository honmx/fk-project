import { IsEmail, IsString } from "class-validator";

export class GetApplicationsLazyDto { 
  offset: number;
  name: string;
  filterId: number;
}