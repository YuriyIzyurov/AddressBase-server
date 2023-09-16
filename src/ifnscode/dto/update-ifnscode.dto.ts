import { PartialType } from '@nestjs/mapped-types';
import { CreateIfnscodeDto } from './create-ifnscode.dto';

export class UpdateIfnscodeDto extends PartialType(CreateIfnscodeDto) {}
