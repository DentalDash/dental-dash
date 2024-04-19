import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Dentist } from 'src/dentist/entities/dentist.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Procedure } from 'src/procedures/entities/procedures.entity';
import { Supplies } from 'src/suplies/entities/supplies.entity';

@Entity('consultation')
export class Consultation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'timestamp' })
  date_time: Date;

  @ManyToOne(() => Dentist, { eager: true })
  dentist: Dentist;

  @ManyToOne(() => Patient, { eager: true })
  patient: Patient;

  @ManyToMany(() => Procedure)
  @JoinTable({
    name: 'consultation_procedure',
    joinColumn: { name: 'consultation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'procedure_id', referencedColumnName: 'id' },
  })
  procedures: Procedure[];

  @ManyToMany(() => Supplies)
  @JoinTable({
    name: 'consultation_supplies',
    joinColumn: { name: 'consultation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'supplies_id', referencedColumnName: 'id' },
  })
  supplies: Supplies[];

  @Column({ nullable: true, type: 'text' })
  oservations: string;

  constructor(partial: Partial<Consultation>) {
    super();
    Object.assign(this, partial);
  }
}
