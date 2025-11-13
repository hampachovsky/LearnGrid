import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassEntity } from './class.entity';
import { SubmissionEntity } from './submission.entity';
import { TopicEntity } from './topic.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  due_date: Date;

  @OneToMany(() => SubmissionEntity, (s) => s.task, { cascade: true })
  submissions: SubmissionEntity[];

  @Column({ nullable: true })
  topic_id: number;

  @ManyToOne(() => TopicEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic: TopicEntity;

  @Column({ nullable: true })
  class_id: number;

  @ManyToOne(() => ClassEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;
}
