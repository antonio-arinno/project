import { Project } from "./project";

export class Product {
    id!: number;
    name!: string;
    description!: string;
    projects: Array<Project> = [];
  }
