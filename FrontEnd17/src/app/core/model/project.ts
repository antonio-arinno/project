import { Product } from "./product";
import { User } from "./user";

export class Project {
    id!: number;
    name!: string;
    description!: string;
    product!: Product;
    responsible!: User;
  }
  