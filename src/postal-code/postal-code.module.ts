import { Module } from '@nestjs/common';
import { PostalCodeService } from './postal-code.service';
import { PostalCodeController } from './postal-code.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostalCode} from "./entities/postal-code.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PostalCode])],
  controllers: [PostalCodeController],
  providers: [PostalCodeService],
})
export class PostalCodeModule {}
