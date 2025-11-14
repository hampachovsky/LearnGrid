import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks', { synchronize: false })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;
}
