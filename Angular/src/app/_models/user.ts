import { Role } from "./role";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    email:string;
    username: string;
    password?: string;
    age: number;
    birthDay: string;
    role: string;
    activate?: boolean;
    superior: boolean;
    department: string;   
    token?: string;
    constructor() {}
}
