import { Project } from "./project";
import { User } from "./user";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    responsible!: User;
    projects: Array<Project> = [];
  }
