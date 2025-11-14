import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('announcement', { synchronize: false })
export class AnnouncementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  class_id: number;
}
