import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {Person} from "./entities/person.entity";

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  /*@Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.createOne(createPersonDto);
  }
*/
  @Post('batch')
  insert() {
    return this.personService.insert();
  }

  @Get()
  findAll(@Query('lastName') lastName: string) {
    return this.personService.findAll(lastName);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
