import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {City} from "src/city/entities/city.entity";
import {PostalCode} from "src/postal-code/entities/postal-code.entity";


@Entity()
export class IFNSCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToMany(() => City, city => city.IFNSCode, { onDelete: 'CASCADE' })
    cities: City[];
}
