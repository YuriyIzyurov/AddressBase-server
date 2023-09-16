import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Street} from "src/street/entities/street.entity";
import {Apartment} from "src/apartment/entities/apartment.entity";


@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @ManyToOne(() => Street, street => street.houses, { onDelete: 'CASCADE' })
    street: Street;

    @OneToMany(() => Apartment, apartment => apartment.house, { onDelete: 'CASCADE' })
    apartments: Apartment[];
}
