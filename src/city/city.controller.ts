import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}


  @Get()
  findAll(@Query('cityName') cityName: string) {
    return this.cityService.findOne(cityName);
  }


  @Get('address')
  getCityInfo(@Query() params: { cityName: string, houseName: string }) {
        //add queries/some basic validation/ban middleware/refactor ppl distribution algorithm
    return this.cityService.getCityInfo(params.cityName, params.houseName);
  }





  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id);
  }
}
