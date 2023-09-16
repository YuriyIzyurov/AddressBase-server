import { Injectable } from '@nestjs/common';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Injectable()
export class PostalCodeService {
  create(createPostalCodeDto: CreatePostalCodeDto) {
    return 'This action adds a new postalCode';
  }

  findAll() {
    return `This action returns all postalCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postalCode`;
  }

  update(id: number, updatePostalCodeDto: UpdatePostalCodeDto) {
    return `This action updates a #${id} postalCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} postalCode`;
  }
}
