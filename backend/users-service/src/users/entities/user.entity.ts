import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'second_name', nullable: false })
  secondName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ name: 'password_hash' })
  passwordHash: string;
}
