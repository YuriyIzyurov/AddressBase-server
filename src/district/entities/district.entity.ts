import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "src/city/entities/city.entity";
import {Street} from "src/street/entities/street.entity";
import {Region} from "src/region/entities/region.entity";

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => City, city => city.district, { onDelete: 'CASCADE' })
    cities: City[];

    @ManyToOne(() => Region, region => region.districts, { onDelete: 'CASCADE' })
    region: Region;
}
