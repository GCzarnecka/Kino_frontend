import {Screening} from "./Screening";
import {User} from "./User";
import {Seat} from "./Seat";

export interface Reservation{
  id: number;
  user: User;
  screening: Screening;
  seats: Seat[];
  price: number;
  paid: boolean;
  reservationDate: Date;
  archived: boolean;
}
