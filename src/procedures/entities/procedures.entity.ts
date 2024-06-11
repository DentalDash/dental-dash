import { Consultation } from 'src/consultation/entities/consultation.entity';
import { Supplies } from 'src/suplies/entities/supplies.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('procedures')
export class Procedure extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Consultation, consultation => consultation.procedures)
  consultations: Consultation[];

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  description: string;

  @ManyToMany(() => Supplies, (supply) => supply.procedures)
  @JoinTable({ name: 'procedure_supplies' })
  supplies: Supplies[];
}
