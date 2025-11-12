export class CreateUserDto {
  email: string;
  firstName: string;
  secondName: string;
  role: 'teacher' | 'student';
  password: string;
}
