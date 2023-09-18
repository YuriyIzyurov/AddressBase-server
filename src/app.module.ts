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
import {BanController} from "./ban.controller";
import {BanMiddleware} from "./ban.middleware";
import {PersonController} from "./person/person.controller";
import {RegionController} from "./region/region.controller";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            //todo: почему ругается на тип?
            database: 'verceldb',
            synchronize: true,
            entities:[__dirname + '/**/*.entity{.js, .ts}'],
            ssl: true,
            extra: {
                ssl: {
                    rejectUnauthorized: false
                }
            }
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
