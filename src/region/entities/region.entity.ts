import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {District} from "../../district/entities/district.entity";
import {City} from "../../city/entities/city.entity";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => District, district => district.region, { onDelete: 'CASCADE' })
    districts: District[];

    @OneToMany(() => City, city => city.region, { onDelete: 'CASCADE' })
    cities: City[];
}
