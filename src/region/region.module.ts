import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Region} from "./entities/region.entity";
import {District} from "../district/entities/district.entity";
import {City} from "../city/entities/city.entity";
import {Street} from "../street/entities/street.entity";
import {House} from "../house/entities/house.entity";
import {Apartment} from "../apartment/entities/apartment.entity";
import {PostalCode} from "../postal-code/entities/postal-code.entity";
import {IFNSCode} from "../ifnscode/entities/ifnscode.entity";
import {OKATOCode} from "../okatocode/entities/okatocode.entity";
import {Person} from "../person/entities/person.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Region, District, City, Street, House, Apartment, PostalCode, IFNSCode, OKATOCode, Person])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}

