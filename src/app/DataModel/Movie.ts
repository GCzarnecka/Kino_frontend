import {Author} from "./Author";
import {Category} from "./Category";

export interface Movie{
  id: number;
  title: string;
  description: string;
  duration: number;
  ageRestriction: number;
  category: Category;
  author: Author;
  poster: string;
}
