import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApplicationsService } from "./applications.service";
import { CreateApplicationDto } from "./dto/createApplicationDto";
import { UpdateStatusDto } from "./dto/updateStatusDto";

@Controller("applications")
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) { }
  // creation
  // lazy load
  // deleting
  // update status

  @Get("/")
  async getApplications() {
    const response = await this.applicationsService.getApplications();
    return response;
  }

  @Get("/lazy")
  async getUsersLazy(@Query("offset") offset: number, @Query("name") name: string, @Query("filterId") filterId: number) {
    return await this.applicationsService.getApplicationsLazy({ offset: Number(offset) || 0, name: name || "", filterId: Number(filterId) || 0 });
  }

  @Post("/")
  async createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    const response = await this.applicationsService.createApplication(createApplicationDto);
    return response;
  }

  @Patch("/:id/updateStatus")
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto, @Param("id") id: number) {
    const response = await this.applicationsService.updateStatus(id, updateStatusDto);
    return response;
  }

  @Delete("/:id")
  async deleteApplication(@Param("id") id: number) {
    const response = await this.applicationsService.deleteApplication(id);
    return response;
  }
}
