export class User {
    id!: number;
    username!: string;
    password!: string;
    name!: string;
    email!: string;
    roles: string[]=[];
    company: string = 'Ariño Company';
  }