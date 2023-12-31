import {Injectable} from '@nestjs/common';
import {CreateRegionDto} from './dto/create-region.dto';
import {UpdateRegionDto} from './dto/update-region.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {District} from "../district/entities/district.entity";
import {Region} from "./entities/region.entity";
import {City} from "../city/entities/city.entity";
import {Street} from "../street/entities/street.entity";
import {OKATOCode} from "../okatocode/entities/okatocode.entity";
import {PostalCode} from "../postal-code/entities/postal-code.entity";
import {IFNSCode} from "../ifnscode/entities/ifnscode.entity";
import {House} from "../house/entities/house.entity";
import {Apartment} from "../apartment/entities/apartment.entity";
import {ivanovskaya, vladimirskaya, yaroslavskaya, streetNames} from "../constants"
import {Person} from "../person/entities/person.entity";


function randomSort<T>(arr: T[]):T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function getRandomElement<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
function splitArray<T>(arr: T[], sortFn: (arr:T[]) => T[]):T[][] {
  const totalLength = arr.length;
  const copyArr = sortFn([...arr])

  const firstArrayLength = Math.floor(totalLength * 0.3);
  const secondArrayLength = Math.floor(totalLength * 0.2);
  const thirdArrayLength = Math.floor(totalLength * 0.1);

  const firstArray = copyArr.slice(0, firstArrayLength);
  const secondArray = copyArr.slice(firstArrayLength, firstArrayLength + secondArrayLength);
  const thirdArray = copyArr.slice(firstArrayLength + secondArrayLength, firstArrayLength + secondArrayLength + thirdArrayLength);
  const fourthArray = copyArr.slice(firstArrayLength + secondArrayLength + thirdArrayLength);

  return [firstArray, secondArray, thirdArray, fourthArray];
}

const [firstArr, secondArr, thirdArr, fouthArr] = splitArray(streetNames, randomSort);


const checkUniqueOKATO = new Set<string>();
const checkUniquePostCode = new Set<string>();
const generateString = (hashset: Set<string>, pattern: string): string => {
  let result = ''
  for(let c of pattern) {
    if(c==='*') {
      const randomDigit = Math.floor(Math.random() * 10);
      result += randomDigit
    } else {
      result += c
    }
  }
  if(hashset.has(result)) {
    return generateString(hashset, pattern)
  }

  hashset.add(result)

  return result
}
//заполним базу адресов для примера только для Ивановской области
const cityCount = (map: Map<string, string[]>) => {
  const allCities = [];
  for (const [key, value] of map) {
    allCities.push(value)
  }
  return allCities.flat().length
}
const populatedDistricts: District[] = []
const populatedCities: City[] = []
const populatedOKATOS: OKATOCode[] = []
const populatedStreets: Street[] = []
const populatedPostalCodes: PostalCode[] = []
const populatedIFNSCodes: IFNSCode[] = []
const populatedHouses: House[] = []
const populatedApartment: Apartment[] = []


@Injectable()
export class RegionService {
  constructor(
      @InjectRepository(Region)
      private readonly regionRepository: Repository<Region>,
      @InjectRepository(District)
      private readonly districtRepository: Repository<District>,
      @InjectRepository(City)
      private readonly cityRepository: Repository<City>,
      @InjectRepository(Street)
      private readonly streetRepository: Repository<Street>,
      @InjectRepository(OKATOCode)
      private readonly okatoRepository: Repository<OKATOCode>,
      @InjectRepository(PostalCode)
      private readonly postalRepository: Repository<PostalCode>,
      @InjectRepository(IFNSCode)
      private readonly ifnsRepository: Repository<IFNSCode>,
      @InjectRepository(House)
      private readonly houseRepository: Repository<House>,
      @InjectRepository(Apartment)
      private readonly apartmentRepository: Repository<Apartment>,
      @InjectRepository(Person)
      private readonly personRepository: Repository<Person>,
  ) {}

  async populateRegion(dto: CreateRegionDto): Promise<{message:string, count:{}}|{message:string}> {
    const regionParams = dto.name==='iv'? {...ivanovskaya} : dto.name==='vl'? {...vladimirskaya} : dto.name==='ya'? {...yaroslavskaya} : null
    if(!regionParams) return {
        message: 'Пустое имя недопустимо',
      }
    //Проверим, вдруг такой регион уже есть
    const regionExist = await this.regionRepository.findOne({
      where: {
        name: regionParams.REGION_NAME
      }
    })

    if(regionExist) {
      return {
        message: 'Такой регион уже есть',
      }
    }

    // Создание региона
    const region = new Region();
    region.name = regionParams.REGION_NAME;
    await this.regionRepository.save(region);

    //IFNS
    regionParams.IFNSCodes.forEach(code => {
      const ifns = new IFNSCode();
      ifns.code = code;
      ifns.cities = []
      populatedIFNSCodes.push(ifns);
    })


    //определим, на сколько городов(кроме мажорных) сколько приходится улиц
    const totalCities = cityCount(regionParams.districts) - 3;
    const streetsPerCity = Math.round(fouthArr.length/totalCities);
    const restStreetsStack = [...fouthArr];


    for (const [districtName, cities] of regionParams.districts) {
      const district = new District();
      district.name = districtName;
      district.region = region;
      district.cities = [];
      cities.map(cityName => {
        const city = new City();
        const OKATO = new OKATOCode();
        const randomIFNS = getRandomElement(populatedIFNSCodes)
        OKATO.code = generateString(checkUniqueOKATO, regionParams.OKATOpattern);
        OKATO.city = city;
        city.name = cityName;
        city.district  = district;
        city.region = region;
        city.streets = [];
        city.postalCodes = [];
        city.okatoCode = OKATO;
        city.IFNSCode = randomIFNS;
        randomIFNS.cities.push(city);


        //создадим и раскидаем улицы по городам
        const fillCityByStreets =  async (streetName:string) => {
          const street = new Street();
          street.name = streetName;
          street.city = city;
          street.postalCodes = [];
          //для упрощения пусть на каждой улице будет 2-3 почтовых индекса
          for(let i=0;i<Math.round(Math.random() * (3 - 2) + 2);i++) {
            //создадим почтовый код
            const post = new PostalCode();
            post.code = generateString(checkUniquePostCode, regionParams.postCodePattern);
            post.city = city;
            city.postalCodes.push(post);
            post.street = street;
            street.postalCodes.push(post);
            populatedPostalCodes.push(post);
          }


          city.streets.push(street)
          //заполним улицу домами
          for(let i=1;i<regionParams.HOUSE_COUNT;i++) {
            const house = new House();
            house.number = String(i);
            house.street = street;
            house.apartments = [];
            //заполним дом квартирами
            for(let j=0;j<regionParams.APART_COUNT;j++) {
              const apartment = new Apartment();
              apartment.number = String(j)
              apartment.house = house;
              apartment.persons = [];
              house.apartments.push(apartment);
              populatedApartment.push(apartment);
            }

            populatedHouses.push(house);
          }
          populatedStreets.push(street);
        }

        if (cityName===regionParams.MAJOR_CITY_1) {
          for(const street of firstArr) {
            fillCityByStreets(street)
          }
        } else if (cityName===regionParams.MAJOR_CITY_2) {
          for(const street of secondArr) {
            fillCityByStreets(street)
          }
        } else if (cityName===regionParams.MAJOR_CITY_3) {
          for(const street of thirdArr) {
            fillCityByStreets(street)
          }
        } else {
          for(let i=0;i<streetsPerCity;i++) {
            const street = restStreetsStack.pop();
            if(!street) break
            fillCityByStreets(street)
          }
        }

        populatedCities.push(city)
        district.cities.push(city)
        populatedOKATOS.push(OKATO)
      })
      populatedDistricts.push(district);
    }

    region.districts = populatedDistricts;
    region.cities = populatedCities;

    // Сохранение региона
    try {
      await Promise.all(populatedOKATOS.map((okato) => this.okatoRepository.save(okato)));
      await this.regionRepository.save(region)
      await Promise.all(populatedDistricts.map((district) => this.districtRepository.save(district)));
      await Promise.all(populatedIFNSCodes.map((code) => this.ifnsRepository.save(code)));
      await Promise.all(populatedCities.map((city) => this.cityRepository.save(city)));
      await Promise.all(populatedStreets.map((street) => this.streetRepository.save(street)));
      await Promise.all(populatedPostalCodes.map((code) => this.postalRepository.save(code)));
      await Promise.all(populatedHouses.map((house) => this.houseRepository.save(house)));
      await Promise.all(populatedApartment.map((apartment) => this.apartmentRepository.save(apartment)));
    } catch(error) {
      return {
        message: "Что-то пошло не так :("
      }
    }

    await this.regionRepository.save(region)
    checkUniquePostCode.clear();
    checkUniqueOKATO.clear();

    const count = await this.getEntityQuantity()

    return {
      message: "База данных успешно создана",
      count
    }
  }

  async getEntityQuantity(): Promise<{}> {
    const entities = {};
    const repos = this.getAllRepos();
    for (const repository of repos) {
      entities[repository.metadata.tableName] = await repository.count()
    }

    return {
      message: "Количество всех сущностей",
      count: entities
    }
  }
  async getUtilityInfo(): Promise<any> {
    const entities = {};
    const repos = this.getAllRepos();
    for (const repository of repos) {
      entities[repository.metadata.tableName] = await repository.find({take: 2})
    }

    return {
      message: "utility info",
      count: entities
    }
  }

  async cleanAll() {
    const repos = this.getAllRepos();
    try {
      for (const repository of repos) {
        await repository.query(`DELETE FROM ${repository.metadata.tableName};`);
        await repository.query(`REINDEX TABLE ${repository.metadata.tableName};`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
    return {
      message: 'База успешно очищена'
    }
  }


  getAllRepos():Repository<any>[] {
    return [
      this.regionRepository, this.districtRepository, this.cityRepository,
      this.streetRepository, this.okatoRepository, this.postalRepository,
      this.ifnsRepository, this.houseRepository, this.apartmentRepository, this.personRepository
    ]
  }

  findAll() {
    return `This action returns all region`;
  }

  findOne(id: number) {
    return `This action returns a #${id} region`;
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
