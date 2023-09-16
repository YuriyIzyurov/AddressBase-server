import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Apartment} from "src/apartment/entities/apartment.entity";


@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    middleName: string

    @Column()
    lastName: string

    @Column()
    passportSerialId: number

    @Column()
    passportId: number

    @Column()
    sex: boolean

    @ManyToOne(() => Person, person => person.apartment)
    apartment: Apartment;
}
