import { Injectable } from '@nestjs/common';
import { CreateOkatocodeDto } from './dto/create-okatocode.dto';
import { UpdateOkatocodeDto } from './dto/update-okatocode.dto';

@Injectable()
export class OkatocodeService {
  create(createOkatocodeDto: CreateOkatocodeDto) {
    return 'This action adds a new okatocode';
  }

  findAll() {
    return `This action returns all okatocode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} okatocode`;
  }

  update(id: number, updateOkatocodeDto: UpdateOkatocodeDto) {
    return `This action updates a #${id} okatocode`;
  }

  remove(id: number) {
    return `This action removes a #${id} okatocode`;
  }
}
