import {CinemaRoom} from "./CinemaRoom";
import {Movie} from "./Movie";
import {Seat} from "./Seat";

export interface Screening{
  id: number;
  movie: Movie;
  cinemaRoom: CinemaRoom;
  startTime: Date;

  price: number;
  seats: Array<Seat>;
}
