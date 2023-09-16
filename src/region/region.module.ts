import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Region} from "src/region/entities/region.entity";
import {District} from "src/district/entities/district.entity";
import {City} from "src/city/entities/city.entity";
import {Street} from "src/street/entities/street.entity";
import {House} from "src/house/entities/house.entity";
import {Apartment} from "src/apartment/entities/apartment.entity";
import {PostalCode} from "src/postal-code/entities/postal-code.entity";
import {IFNSCode} from "src/ifnscode/entities/ifnscode.entity";
import {OKATOCode} from "src/okatocode/entities/okatocode.entity";
import {Person} from "src/person/entities/person.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Region, District, City, Street, House, Apartment, PostalCode, IFNSCode, OKATOCode, Person])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}

