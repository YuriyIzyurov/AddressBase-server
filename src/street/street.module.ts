import { Module } from '@nestjs/common';
import { StreetService } from './street.service';
import { StreetController } from './street.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Street} from "src/street/entities/street.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Street])],
  controllers: [StreetController],
  providers: [StreetService],
})
export class StreetModule {}
