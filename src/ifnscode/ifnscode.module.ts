import { Module } from '@nestjs/common';
import { IfnscodeService } from './ifnscode.service';
import { IfnscodeController } from './ifnscode.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IFNSCode} from "./entities/ifnscode.entity";

@Module({
  imports: [TypeOrmModule.forFeature([IFNSCode])],
  controllers: [IfnscodeController],
  providers: [IfnscodeService],
})
export class IfnscodeModule {}
