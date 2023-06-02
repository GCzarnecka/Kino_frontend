import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Category} from "../DataModel/Category";
import {CinemaRoom} from "../DataModel/CinemaRoom";

@Injectable({
  providedIn: 'root'
})
export class CinemaRoomService {

  constructor(private restService: RestService) { }

  getCinemaRooms() {
    return this.restService.get<CinemaRoom[]>("api/rooms");
  }
}
