import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Reservation} from "../DataModel/Reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private restService: RestService) { }

  placeReservation(reservation: Reservation) {
    return this.restService.post('logged/place-order', {...reservation});
  }
}
