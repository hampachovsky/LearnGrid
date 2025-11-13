import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('class', { synchronize: false })
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;
}
