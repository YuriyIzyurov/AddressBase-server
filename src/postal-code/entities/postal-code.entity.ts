import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {City} from "src/city/entities/city.entity";
import {Street} from "src/street/entities/street.entity";


@Entity()
export class PostalCode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @ManyToOne(() => City, city => city.postalCodes, { onDelete: 'CASCADE' })
    city: City;

    @ManyToOne(() => Street, street => street.postalCodes, { onDelete: 'CASCADE' })
    street: Street;
}
