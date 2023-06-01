import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Movie} from "../DataModel/Movie";
import {Category} from "../DataModel/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private restService: RestService) { }

  getCategories() {
    return this.restService.get<Category[]>("api/categories");
  }
}
