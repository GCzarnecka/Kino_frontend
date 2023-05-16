import {CinemaRoom} from "./CinemaRoom";

export interface Seat{
  id: number;
  sectorNumber: number;
  isTaken: boolean;
  seatNumber: number;
}
