import {CinemaRoom} from "./CinemaRoom";

export interface Seat{
  id: number;
  sectorNumber: number;
  taken: boolean;
  seatNumber: number;
}
