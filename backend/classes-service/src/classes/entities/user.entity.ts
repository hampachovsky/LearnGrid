import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ClassUser } from './class-user.entity';

@Entity('users', { synchronize: false })
export class UserEntity {
  @PrimaryColumn()
  id: number;

  @OneToMany(() => ClassUser, (cu) => cu.user)
  classes: ClassUser[];
}
