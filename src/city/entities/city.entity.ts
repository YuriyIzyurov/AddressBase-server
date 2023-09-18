import {
    Column,
    Entity,
    JoinColumn, ManyToOne,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import {District} from "../../district/entities/district.entity";
import {Region} from "../../region/entities/region.entity";
import {Street} from "../../street/entities/street.entity";
import {OKATOCode} from "../../okatocode/entities/okatocode.entity";
import {PostalCode} from "../../postal-code/entities/postal-code.entity";
import {IFNSCode} from "../../ifnscode/entities/ifnscode.entity";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => District, district => district.cities, { onDelete: 'CASCADE' })
    district: District;

    @ManyToOne(() => Region, region => region.cities, { onDelete: 'CASCADE' })
    region: Region;

    @OneToMany(() => Street, street => street.city, { onDelete: 'CASCADE' })
    streets: Street[];

    @OneToMany(() => PostalCode, postalCode => postalCode.city, { onDelete: 'CASCADE' })
    postalCodes: PostalCode[];

    @ManyToOne(() => IFNSCode, IFNSCode => IFNSCode.cities, { onDelete: 'CASCADE' })
    IFNSCode: IFNSCode;

    @OneToOne(() => OKATOCode, okatoCode => okatoCode.city, { onDelete: 'CASCADE' })
    @JoinColumn()
    okatoCode: OKATOCode;
}

