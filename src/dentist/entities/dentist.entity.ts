import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

export enum EstadoCRO {
    AC = 'AC', 
    AL = 'AL', 
    AP = 'AP', 
    AM = 'AM', 
    BA = 'BA', 
    CE = 'CE', 
    DF = 'DF', 
    ES = 'ES', 
    GO = 'GO', 
    MA = 'MA', 
    MT = 'MT', 
    MS = 'MS', 
    MG = 'MG', 
    PA = 'PA', 
    PB = 'PB', 
    PR = 'PR', 
    PE = 'PE', 
    PI = 'PI', 
    RJ = 'RJ', 
    RN = 'RN', 
    RS = 'RS', 
    RO = 'RO', 
    RR = 'RR', 
    SC = 'SC', 
    SP = 'SP', 
    SE = 'SE', 
    TO = 'TO'
}

@Entity('dentists')
export class Dentist extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ nullable: false, type: 'varchar', length: 50 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 25 })
    category: string;

    @Column({ nullable: false, type: 'varchar', length: 6 })
    croNumber: string;

    @Column({ type: 'enum', enum: EstadoCRO })
    croState: EstadoCRO;

    @Column({ nullable: false, type: 'boolean', default: false })
    isAdmin: boolean;

}
