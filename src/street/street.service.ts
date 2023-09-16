import { Injectable } from '@nestjs/common';
import { CreateStreetDto } from './dto/create-street.dto';
import { UpdateStreetDto } from './dto/update-street.dto';

@Injectable()
export class StreetService {
  create(createStreetDto: CreateStreetDto) {
    return 'This action adds a new street';
  }

  findAll() {
    return `This action returns all street`;
  }

  findOne(id: number) {
    return `This action returns a #${id} street`;
  }

  update(id: number, updateStreetDto: UpdateStreetDto) {
    return `This action updates a #${id} street`;
  }

  remove(id: number) {
    return `This action removes a #${id} street`;
  }
}
