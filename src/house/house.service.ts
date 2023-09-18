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

  async findAllByName(number: string): Promise<any[]|{}> {

    try {
      const query = await this.houseRepository.createQueryBuilder('house')
          .leftJoin('house.street', 'street')
          .leftJoin('house.apartments', 'apartment')
          .leftJoin('street.city', 'city')
          .leftJoin('apartment.persons', 'person')
          .select(['city','street','house','COUNT(DISTINCT person.id) AS personCount'])
          .where('house.number = :number', { number: number })
          .andWhere('person.id IS NOT NULL')
          .groupBy('house.id, street.id, city.id')
          .getRawMany()

      if(!query) {
        return {
          message: 'Ничего не найдено',
          queryId: 1
        }
      }
      return  {
        message: 'Успех',
        queryId: 1,
        result: query
      };

    } catch(e) {
      return {
        message: e,
        queryId: 1
      }
    }
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
