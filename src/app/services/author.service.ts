import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Category} from "../DataModel/Category";
import {Author} from "../DataModel/Author";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private restService: RestService) { }

  getAuthors() {
    return this.restService.get<Author[]>("api/authors");
  }

  postAuthor(author: Author) {
    return this.restService.post<Author>("api/authors", author);
  }
}
