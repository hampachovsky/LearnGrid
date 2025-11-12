import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassUser } from './class-user.entity';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, type: 'uuid', default: () => 'gen_random_uuid()' })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ClassUser, (cu) => cu.class, { cascade: true })
  members: ClassUser[];
}
