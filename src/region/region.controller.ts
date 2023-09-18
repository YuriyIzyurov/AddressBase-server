import {Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post('populate')
  populateRegion(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.populateRegion(createRegionDto);
  }
  @Delete('populate')
   clearDataBase() {
    return this.regionService.cleanAll()
  }

  @Get('quantity')
  getEntityQuantity() {
    return this.regionService.getEntityQuantity();
  }

  @Get('utility')
  getUtilityInfo() {
    return this.regionService.getUtilityInfo();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
