import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {City} from "src/city/entities/city.entity";
import {Street} from "src/street/entities/street.entity";

@Module({
  imports: [TypeOrmModule.forFeature([City, Street])],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
