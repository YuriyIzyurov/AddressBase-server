import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { StreetModule } from './street/street.module';
import { HouseModule } from './house/house.module';
import { ApartmentModule } from './apartment/apartment.module';
import { PostalCodeModule } from './postal-code/postal-code.module';
import { IfnscodeModule } from './ifnscode/ifnscode.module';
import { OkatocodeModule } from './okatocode/okatocode.module';
import {BanController} from "src/ban.controller";
import {BanMiddleware} from "src/ban.middleware";
import {PersonController} from "src/person/person.controller";
import {RegionController} from "src/region/region.controller";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            //todo: почему ругается на тип?
            database: 'villains',
            synchronize: true,
            entities:[__dirname + '/**/*.entity{.js, .ts}']
        }),
          inject: [ConfigService],
      }),
      PersonModule,
      CityModule,
      DistrictModule,
      RegionModule,
      StreetModule,
      HouseModule,
      ApartmentModule,
      PostalCodeModule,
      IfnscodeModule,
      OkatocodeModule,
  ],
    controllers: [AppController, BanController],
    providers: [AppService, BanMiddleware],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(BanMiddleware)
            .forRoutes(PersonController, RegionController);
    }
}
