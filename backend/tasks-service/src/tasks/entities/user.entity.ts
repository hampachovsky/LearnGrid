import { Entity, PrimaryColumn } from 'typeorm';

@Entity('users', { synchronize: false })
export class UserEntity {
  @PrimaryColumn()
  id: number;
}
