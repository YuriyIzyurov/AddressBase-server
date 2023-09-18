import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {City} from "./entities/city.entity";
import {Street} from "../street/entities/street.entity";

@Injectable()
export class CityService {
  constructor(
      @InjectRepository(City)
      private readonly cityRepository: Repository<City>,
      @InjectRepository(Street)
      private readonly streetRepository: Repository<Street>,
  ) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  async findOne(name: string) {

    try {
      const query = await this.cityRepository.createQueryBuilder('city')
          .leftJoin('city.streets', 'street')
          .leftJoin('street.houses', 'house')
          .leftJoin('house.apartments','apartment')
          .leftJoin('apartment.persons','person')
          .select(['city.name','street.name','house.number','house.id'])
          .where('city.name = :name', { name })
          .andWhere('person.id IS NULL')
          .getRawMany()

      if(!query) {
        return {
          message: 'Не найдено',
          queryId: 3,
        }
      }
      return {
        message: 'Успех',
        queryId: 3,
        result: query
      }
    } catch(e) {
      return {
        message: 'error',
        queryId: 3,
        error: e
      }
    }
  }

  async getCityInfo(streetName, houseNumber) {
    try {
      const query = await this.streetRepository.createQueryBuilder('street')
          .leftJoin('street.houses', 'house')
          .leftJoin('street.city', 'city')
          .leftJoin('street.postalCodes', 'postalCode')
          .leftJoin('city.IFNSCode', 'ifnsCode')
          .leftJoin('city.okatoCode', 'okatoCode')
          .select(['street.name','city.name','house','postalCode.code','ifnsCode.code','okatoCode.code'])
          .where('street.name = :streetName', { streetName })
          .andWhere('house.number = :houseNumber', { houseNumber })
          .groupBy('street.id, city.id, house.id, postalCode.id, ifnsCode.id, okatoCode.id')
          .getRawMany()

      if(!query) {
        return {
          message: 'Не найдено',
          queryId: 4,
        }
      }
      return {
        message: 'Успех',
        queryId: 4,
        result: query
      }
    } catch(e) {
      return {
        message: 'error',
        queryId: 4,
        error: e
      }
    }
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
