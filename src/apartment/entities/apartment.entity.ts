import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {House} from "../../house/entities/house.entity";
import {Person} from "../../person/entities/person.entity";

@Entity()
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @OneToMany(() => Person, person => person.apartment, { onDelete: 'CASCADE' })
    persons: Person[];

    @ManyToOne(() => House, house => house.apartments, { onDelete: 'CASCADE' })
    house: House;
}
