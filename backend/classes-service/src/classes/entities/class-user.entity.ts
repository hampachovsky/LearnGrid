import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassEntity } from './class.entity';
import { UserEntity } from './user.entity';

@Entity('class_user')
export class ClassUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClassEntity, (cls) => cls.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @Column()
  class_id: number;

  @ManyToOne(() => UserEntity, (user) => user.classes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  user_id: number;

  @Column({ length: 50 })
  role: 'student' | 'teacher';
}
