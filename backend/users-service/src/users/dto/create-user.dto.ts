import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  firstName: string;
  secondName: string;
  role: UserRole;
  password: string;
}
