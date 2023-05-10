import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {User} from "../DataModel/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService: RestService) { }

  getUser():Observable<User> {
    return this.restService.get('logged/user');
  }
}
