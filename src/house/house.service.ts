import { Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {House} from "src/house/entities/house.entity";
import {Repository} from "typeorm";
import {Street} from "src/street/entities/street.entity";
import {City} from "src/city/entities/city.entity";

type ResponseType = {
  city: string,
  street: string,
  building: string,
  personCount: number,
}
@Injectable()
export class HouseService {
  constructor(
      @InjectRepository(House)
      private readonly houseRepository: Repository<House>,
      @InjectRepository(Street)
      private readonly streetRepository: Repository<Street>,
      @InjectRepository(City)
      private readonly cityRepository: Repository<City>,
  ) {}

  create(createHouseDto: CreateHouseDto) {
    return 'This action adds a new house';
  }

  async findAllByName(number: string): Promise<any[]> {
    const data1 = await this.houseRepository.count();
    const data2 = await this.streetRepository.count();
    const data3 = await this.cityRepository.count();
    console.log(data1,data2,data3)
    return await this.houseRepository.find()
    /*const query = this.houseRepository.createQueryBuilder('house')
        .select('house.number', 'houseNumber')
        .addSelect('street.name', 'houseStreet')
        .addSelect('city.name', 'cityName')
        .leftJoinAndSelect('house.street', 'street')
        .leftJoinAndSelect('street.city', 'city')
        .where('house.number = :number', { number });

    return await query.getMany();*/
  }

  findOne(id: number) {
    return `This action returns a #${id} house`;
  }

  update(id: number, updateHouseDto: UpdateHouseDto) {
    return `This action updates a #${id} house`;
  }

  remove(id: number) {
    return `This action removes a #${id} house`;
  }
}
