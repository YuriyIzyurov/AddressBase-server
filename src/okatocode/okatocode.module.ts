import { Module } from '@nestjs/common';
import { OkatocodeService } from './okatocode.service';
import { OkatocodeController } from './okatocode.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OKATOCode} from "./entities/okatocode.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OKATOCode])],
  controllers: [OkatocodeController],
  providers: [OkatocodeService],
})
export class OkatocodeModule {}
