import { PartialType } from '@nestjs/mapped-types';
import { CreateOkatocodeDto } from './create-okatocode.dto';

export class UpdateOkatocodeDto extends PartialType(CreateOkatocodeDto) {}
