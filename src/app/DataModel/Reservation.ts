import {Screening} from "./Screening";
import {User} from "./User";
import {Seat} from "./Seat";

export interface Reservation{
  id: number;
  screening: Screening;
  seatsIds: Number[];
  price: number;
  paid: boolean;
  reservationTime: Date;
  archived: boolean;
}
