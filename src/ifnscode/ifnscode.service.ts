import { Injectable } from '@nestjs/common';
import { CreateIfnscodeDto } from './dto/create-ifnscode.dto';
import { UpdateIfnscodeDto } from './dto/update-ifnscode.dto';

@Injectable()
export class IfnscodeService {
  create(createIfnscodeDto: CreateIfnscodeDto) {
    return 'This action adds a new ifnscode';
  }

  findAll() {
    return `This action returns all ifnscode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ifnscode`;
  }

  update(id: number, updateIfnscodeDto: UpdateIfnscodeDto) {
    return `This action updates a #${id} ifnscode`;
  }

  remove(id: number) {
    return `This action removes a #${id} ifnscode`;
  }
}
