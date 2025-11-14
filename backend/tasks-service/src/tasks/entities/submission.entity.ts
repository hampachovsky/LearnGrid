import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassUser } from './class-user.entity';
import { TaskEntity } from './task.entity';

@Entity('submissions')
export class SubmissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  grade: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submitted_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => TaskEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @Column()
  task_id: number;

  @ManyToOne(() => ClassUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_user_id' })
  classUser: ClassUser;

  @Column()
  class_user_id: number;
}
