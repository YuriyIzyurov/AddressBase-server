import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../../city/entities/city.entity";


@Entity()
export class IFNSCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => City, city => city.IFNSCode, { onDelete: 'CASCADE' })
    cities: City[];
}
