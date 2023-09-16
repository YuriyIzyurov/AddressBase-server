import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "./entities/person.entity";
import {InsertResult, Repository} from "typeorm";
import {
  APART_COUNT_PER_HOUSE,
  female,
  male
} from '../constants'
import {Apartment} from "src/apartment/entities/apartment.entity";

function generateRandomFemaleName() {
  const randomIndex = Math.floor(Math.random() * female.names.length);
  return female.names[randomIndex];
}

function generateRandomFemaleMiddleName() {
  const randomIndex = Math.floor(Math.random() * female.middleNames.length);
  return female.middleNames[randomIndex];
}

function generateRandomFemaleLastName() {
  const randomIndex = Math.floor(Math.random() * female.lastNames.length);
  return female.lastNames[randomIndex];
}

function generateRandomMaleName() {
  const randomIndex = Math.floor(Math.random() * male.names.length);
  return male.names[randomIndex];
}

function generateRandomMaleMiddleName() {
  const randomIndex = Math.floor(Math.random() * male.middleNames.length);
  return male.middleNames[randomIndex];
}

function generateRandomMaleLastName() {
  const randomIndex = Math.floor(Math.random() * male.lastNames.length);
  return male.lastNames[randomIndex];
}

function generateRandomPassportSerialId() {
  const minSerialId = 1000;
  const maxSerialId = 9999;

  return  Math.floor(Math.random() * (maxSerialId - minSerialId + 1)) + minSerialId;
}

function generateRandomPassportId() {
  const minSerialId = 100000;
  const maxSerialId = 999999;

  return  Math.floor(Math.random() * (maxSerialId - minSerialId + 1)) + minSerialId;
}


@Injectable()
export class PersonService {

  constructor(
      @InjectRepository(Person)
      private readonly personRepository: Repository<Person>,
      @InjectRepository(Apartment)
      private readonly apartmentRepository: Repository<Apartment>,
  ) {}

  async createOne(isMan: boolean): Promise<Person> {

    let generatedData
    if(isMan) {
      generatedData = {
        rndFirstName: generateRandomMaleName(),
        rndMiddleName: generateRandomMaleMiddleName(),
        rndLastName: generateRandomMaleLastName(),
        rndPassportSerialId: generateRandomPassportSerialId(),
        rndPassportId: generateRandomPassportId(),
        rndSex: false,
      }
    } else {
      generatedData = {
        rndFirstName: generateRandomFemaleName(),
        rndMiddleName: generateRandomFemaleMiddleName(),
        rndLastName: generateRandomFemaleLastName(),
        rndPassportSerialId: generateRandomPassportSerialId(),
        rndPassportId: generateRandomPassportId(),
        rndSex: true,
      }
    }

    const personExist = await this.personRepository.findOne({
      where: {
        passportSerialId: generatedData.rndPassportSerialId,
        passportId: generatedData.rndPassportId
      }
    })
    if(personExist) {
      return personExist
    }
    const person = new Person();
    person.firstName = generatedData.rndFirstName;
    person.middleName = generatedData.rndMiddleName;
    person.lastName = generatedData.rndLastName;
    person.passportSerialId = generatedData.rndPassportSerialId;
    person.passportId = generatedData.rndPassportId;
    person.sex = generatedData.rndSex;

    return person;
  }

  async insert() {
    const allApartsArr = await this.apartmentRepository.find();
    const houseCount = allApartsArr.length/APART_COUNT_PER_HOUSE;
    const apartIndex = APART_COUNT_PER_HOUSE;
    const peopleCount = 5000;
    const personStack = [];

    try {
      for(let i=0;i<peopleCount;i++) {
        const gender = Math.random() < 0.5;
        const generatedPerson = await this.createOne(gender)
        personStack.push(generatedPerson)
      }
      await this.personRepository.save(personStack)

      //пока у нас все жители не распределены, крутим цикл
      while(personStack.length>0) {
        const randomHouse = Math.floor(Math.random() * houseCount);
        const index = apartIndex*randomHouse;
        const firstApartOfRandomHouse = allApartsArr[index];
        if(firstApartOfRandomHouse.persons && firstApartOfRandomHouse.persons.length>0) {
          //значит этот дом мы заселили и ищем другой дом, тут ниче не делаем
        } else {
          //дом пустует, можно заполнить его жителями в расчете 1-4 человека на квартиру
          for(let i=0;i<APART_COUNT_PER_HOUSE-1;i++) {
            const personPerApart = Math.floor(Math.random() * 4) + 1;
            for(let i=0;i<personPerApart;i++) {
              const person = personStack.pop();
              allApartsArr[index+i].persons.push(person);
            }
          }
        }
      }

      const countPers = await this.personRepository.count()
      const countAparts = await this.apartmentRepository.count()

      return {
        message: "Люди успешно заселены",
        count: {
          person: countPers,
          apartments: countAparts
        }
      }

    }
    catch(e)
    {
      return {
        message: "Что-то пошло не так :(",
      }
    }
  }


  async findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }






  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`;
  }

  remove(id: number) {
    return `This action removes a #${id} person`;
  }
}
