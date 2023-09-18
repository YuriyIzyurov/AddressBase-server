import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {City} from "../../city/entities/city.entity";


@Entity()
export class OKATOCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @OneToOne(() => City, city => city.okatoCode, )
    city: City;
}
