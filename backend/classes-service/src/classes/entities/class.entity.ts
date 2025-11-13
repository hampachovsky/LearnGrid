import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnouncementEntity } from './announcement.entity';
import { ClassUser } from './class-user.entity';
import { TopicEntity } from './topic.entity';

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

  @OneToMany(() => TopicEntity, (topic) => topic.class)
  topics: TopicEntity[];

  @OneToMany(() => AnnouncementEntity, (ann) => ann.class, { cascade: true })
  announcements: AnnouncementEntity[];
}
