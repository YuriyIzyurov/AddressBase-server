import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OkatocodeService } from './okatocode.service';
import { CreateOkatocodeDto } from './dto/create-okatocode.dto';
import { UpdateOkatocodeDto } from './dto/update-okatocode.dto';

@Controller('okatocode')
export class OkatocodeController {
  constructor(private readonly okatocodeService: OkatocodeService) {}

  @Post()
  create(@Body() createOkatocodeDto: CreateOkatocodeDto) {
    return this.okatocodeService.create(createOkatocodeDto);
  }

  @Get()
  findAll() {
    return this.okatocodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.okatocodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOkatocodeDto: UpdateOkatocodeDto) {
    return this.okatocodeService.update(+id, updateOkatocodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.okatocodeService.remove(+id);
  }
}
