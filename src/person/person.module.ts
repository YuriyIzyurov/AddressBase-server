import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Person} from "./entities/person.entity";
import {Apartment} from "src/apartment/entities/apartment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Person, Apartment])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
