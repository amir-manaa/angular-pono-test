import { UserRole } from '@app/shared/enums/UserRole';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole.Teacher | UserRole.Student;
}