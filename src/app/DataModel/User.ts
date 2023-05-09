import {Reservation} from "./Reservation";
import {MessageComplaint} from "./MessageComplaint";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
  surname: string;
  age: number;
  reservations: Reservation[];
  complaints: MessageComplaint[];

}
