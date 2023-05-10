import {Reservation} from "./Reservation";
import {MessageComplaint} from "./MessageComplaint";

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  Role: string;
  surname: string;
  age: number;
  reservations: Reservation[];
  complaints: MessageComplaint[];

}
