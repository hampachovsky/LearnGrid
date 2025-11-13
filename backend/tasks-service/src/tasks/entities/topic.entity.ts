import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassEntity } from './class.entity';

@Entity('topic', { synchronize: false })
export class TopicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;

  @ManyToOne(() => ClassEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;
}
