import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {House} from "./entities/house.entity";
import {Street} from "../street/entities/street.entity";
import {City} from "../city/entities/city.entity";

@Module({
  imports: [TypeOrmModule.forFeature([House, Street, City])],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
