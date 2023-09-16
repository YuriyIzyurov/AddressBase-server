import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IfnscodeService } from './ifnscode.service';
import { CreateIfnscodeDto } from './dto/create-ifnscode.dto';
import { UpdateIfnscodeDto } from './dto/update-ifnscode.dto';

@Controller('ifnscode')
export class IfnscodeController {
  constructor(private readonly ifnscodeService: IfnscodeService) {}

  @Post()
  create(@Body() createIfnscodeDto: CreateIfnscodeDto) {
    return this.ifnscodeService.create(createIfnscodeDto);
  }

  @Get()
  findAll() {
    return this.ifnscodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ifnscodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIfnscodeDto: UpdateIfnscodeDto) {
    return this.ifnscodeService.update(+id, updateIfnscodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ifnscodeService.remove(+id);
  }
}
