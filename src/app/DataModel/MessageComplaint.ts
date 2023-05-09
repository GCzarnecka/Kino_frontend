import {Reservation} from "./Reservation";

export interface MessageComplaint {
  id: number;
  message: string;
  date: Date;
  reservation: Reservation;

}
