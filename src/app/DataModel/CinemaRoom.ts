import {Screening} from "./Screening";
import {Seat} from "./Seat";

export interface CinemaRoom {
  id: number;
  name: string;
  // screenings: Screening[];
  rowsNumber: number;
  columnsNumber: number;

}
