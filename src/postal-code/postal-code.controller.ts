import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostalCodeService } from './postal-code.service';
import { CreatePostalCodeDto } from './dto/create-postal-code.dto';
import { UpdatePostalCodeDto } from './dto/update-postal-code.dto';

@Controller('postal-code')
export class PostalCodeController {
  constructor(private readonly postalCodeService: PostalCodeService) {}

  @Post()
  create(@Body() createPostalCodeDto: CreatePostalCodeDto) {
    return this.postalCodeService.create(createPostalCodeDto);
  }

  @Get()
  findAll() {
    return this.postalCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postalCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostalCodeDto: UpdatePostalCodeDto) {
    return this.postalCodeService.update(+id, updatePostalCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postalCodeService.remove(+id);
  }
}
