import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Reservation} from "../DataModel/Reservation";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private restService: RestService, private http: HttpClient) { }

  placeReservation(reservation: Reservation) {
    return this.restService.post('logged/place-order', {...reservation});
  }

  updateReservation(reservation: Reservation) {
    return this.restService.post<Reservation>('logged/reservation', reservation);
  }

  deleteReservation(reservation: Reservation) {
    return this.restService.delete<Reservation>('logged/reservation', reservation.id);
  }
}
