import { Supplies } from 'src/suplies/entities/supplies.entity';
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Procedure extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  description: string;

  @OneToMany(() => Supplies, (supply) => supply.procedure)
  supplies: Supplies[];
}
