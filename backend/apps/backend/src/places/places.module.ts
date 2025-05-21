import { Module } from '@nestjs/common';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { FileModule, HelpersModule, RmqModule } from '@app/common';

@Module({
  imports: [
    RmqModule.register({ name: "PLACES" }),
    FileModule,
    HelpersModule
  ],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
