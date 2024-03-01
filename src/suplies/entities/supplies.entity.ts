// Create an entity named supplies with the columns id, name, description, isConsumable, materialType

import { Procedure } from 'src/procedures/entities/procedures.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Supplies extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  description: string;

  @Column({ default: false, type: 'boolean' })
  isConsumable: boolean;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  materialType: string;

  @ManyToOne(() => Procedure, (procedure) => procedure.supplies)
  procedure: Procedure;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
