import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {District} from "src/district/entities/district.entity";
import {City} from "src/city/entities/city.entity";
import {House} from "src/house/entities/house.entity";
import {PostalCode} from "src/postal-code/entities/postal-code.entity";

@Entity()
export class Street {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => City, city => city.streets, { onDelete: 'CASCADE' })
    city: City;

    @OneToMany(() => PostalCode, postalCode => postalCode.street, { onDelete: 'CASCADE' })
    postalCodes: PostalCode[]

    @OneToMany(() => House, house => house.street, { onDelete: 'CASCADE' })
    houses: House[];
}
