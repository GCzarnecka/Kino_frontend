import {CinemaRoom} from "./CinemaRoom";
import {Movie} from "./Movie";
import {Seat} from "./Seat";

export interface Screening{
  id: number;
  date: Date;
  movie: Movie;
  cinemaRoom: CinemaRoom;
  startTime: Date;

  seats: Array<Seat>;
}
