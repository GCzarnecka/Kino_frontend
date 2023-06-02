import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {User} from "../DataModel/User";
import {Screening} from "../DataModel/Screening";
import {Reservation} from "../DataModel/Reservation";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService: RestService) { }

  getUser():Observable<User> {
    return this.restService.get<User>('logged/user' );
  }


}
