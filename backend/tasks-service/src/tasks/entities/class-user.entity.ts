import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class_user', { synchronize: false })
export class ClassUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;

  @Column()
  user_id: number;

  @Column({ length: 50 })
  role: 'student' | 'teacher';
}
