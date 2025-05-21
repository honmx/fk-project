import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { JwtAuthGuard, SharpPipe } from '@app/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SetMedicalDocumentExpirationDto } from './dto/setMedicalDocumentExpirationDto';
import { SetInsuranceExpirationDto } from './dto/setInsuranceExpirationDto';
import { ChangeGroupDto } from './dto/changeGroupDto';
import { ChangeRoleDto } from './dto/changeRoleDto';
import { RemoveGroupDto } from './dto/removeGroupDto';
import { GetUsersAbleToHaveGroupLazyDto } from './dto/getUsersAbleToHaveGroupLazyDto';
import { ChangeTrainingsLeftDto } from './dto/changeTrainingsLeftDto';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get("group/:groupId/participants")
  async getUsersByGroupId(@Param("groupId") groupId: number) {
    return await this.usersService.getUsersByGroupId(groupId);
  }

  @Get("/lazy")
  async getUsersLazy(@Query("offset") offset: number, @Query("name") name: string, @Query("filterId") filterId: number) {
    return await this.usersService.getUsersLazy({ offset: Number(offset) || 0, name, filterId: Number(filterId) || 0 });
  }

  @Get("ableToHaveGroup/:groupId/:amountOfTrainingsInSubscription/lazy")
  async getUsersAbleToHaveGroupLazy(
    @Param("groupId") groupId: number,
    @Param("amountOfTrainingsInSubscription") amountOfTrainingsInSubscription: number,
    @Query("offset") offset: number,
    @Query("name") name: string
  ) {
    return await this.usersService.getUsersAbleToHaveGroupLazy({ groupId, amountOfTrainingsInSubscription, offset: Number(offset) || 0, name });
  }

  @Get("/withoutGroup")
  async getUsersWithoutGroup() {
    return await this.usersService.getUsersWithoutGroup();
  }

  @Get("/ableToHaveGroup/:groupId/:amountOfTrainingsInSubscription")
  async getUsersAbleToHaveGroup(
    @Param("groupId") groupId: number,
    @Param("amountOfTrainingsInSubscription") amountOfTrainingsInSubscription: number
  ) {
    return await this.usersService.getUsersAbleToHaveGroup(groupId, amountOfTrainingsInSubscription);
  }

  @Get("/coachRoles")
  async getCoachRoles() {
    return await this.usersService.getCoachRoles();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post("/user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Patch(":id/removeGroup")
  async removeGroup(@Body() removeGroupDto: RemoveGroupDto, @Param("id") id: number) {
    return await this.usersService.removeGroup(id, removeGroupDto);
  }

  @Patch(":id/changeGroup")
  async changeGroup(@Body() changeGroupDto: ChangeGroupDto, @Param("id") id: number) {
    return await this.usersService.changeGroup(id, changeGroupDto);
  }

  @Patch(":id/changeRole")
  async changeRole(@Body() changeRoleDto: ChangeRoleDto, @Param("id") id: number) {
    return await this.usersService.changeRole(id, changeRoleDto);
  }

  @Patch(":id/deleteRole")
  async deleteRole(@Param("id") id: number) {
    return await this.usersService.deleteRole(id);
  }

  @Patch(":id/changeTrainingsLeft")
  async changeTrainingsLeft(@Body() changeTrainingsLeftDto: ChangeTrainingsLeftDto, @Param("id") id: number) {
    return await this.usersService.changeTrainingsLeft(id, changeTrainingsLeftDto);
  }

  @Patch(":id/uploadAvatar")
  @UseInterceptors(FileInterceptor("photo"))
  async uploadAvatar(@Param("id") id: number, @UploadedFile(SharpPipe) photo: Express.Multer.File) {
    return await this.usersService.uploadAvatar(id, photo);
  }

  @Patch(":id/uploadMedicalDocumentPhoto")
  @UseInterceptors(FileInterceptor("photo"))
  async uploadMedicalDocumentPhoto(@Param("id") id: number, @UploadedFile(SharpPipe) photo: Express.Multer.File) {
    return await this.usersService.uploadMedicalDocumentPhoto(id, photo);
  }

  @Patch(":id/setMedicalDocumentExpiration")
  async setMedicalDocumentExpiration(@Body() setMedicalDocumentExpirationDto: SetMedicalDocumentExpirationDto, @Param("id") id: number) {
    return await this.usersService.setMedicalDocumentExpiration(id, setMedicalDocumentExpirationDto);
  }

  @Patch(":id/uploadInsurancePhoto")
  @UseInterceptors(FileInterceptor("photo"))
  async uploadInsurancePhoto(@Param("id") id: number, @UploadedFile(SharpPipe) photo: Express.Multer.File) {
    return await this.usersService.uploadInsurancePhoto(id, photo);
  }

  @Patch(":id/setInsuranceExpiration")
  async setInsuranceExpiration(@Body() setInsuranceExpirationDto: SetInsuranceExpirationDto, @Param("id") id: number) {
    return await this.usersService.setInsuranceExpiration(id, setInsuranceExpirationDto);
  }

  // @Post("/role")
  // createRole(@Body() createRoleDto: createRoleDto) {
  //   return this.usersService.createRole(createRoleDto);
  // }
}
