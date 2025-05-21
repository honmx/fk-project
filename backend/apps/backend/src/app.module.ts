import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContentModule } from './content/content.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from "./users/users.module";
import { GroupModule } from './groups/groups.module';
import { PlacesModule } from './places/places.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./.env"
    }),
    ContentModule,
    AuthModule,
    UsersModule,
    GroupModule,
    PlacesModule,
    ApplicationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
