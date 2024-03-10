import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('patients')
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  patientName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  patientEmail: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  phone: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  cpf: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  rg: string;

  @Column({ nullable: false, type: 'enum', enum: Gender })
  genre: Gender;

  @Column({ nullable: false, type: 'date' })
  birthDate: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  address: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  number: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  complement: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  city: string;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  state: string;

  @Column({ nullable: false, type: 'varchar', length: 8 })
  zipCode: string;

  @Column({ nullable: true, type: 'text' })
  allergies: string;

  @Column({ nullable: true, type: 'text' })
  currentMedications: string;

  @Column({ nullable: true, type: 'text' })
  medicalConditions: string;
}
