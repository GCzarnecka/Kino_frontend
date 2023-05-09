import {CinemaRoom} from "./CinemaRoom";
import {Movie} from "./Movie";

export interface Screening{
  id: number;
  date: Date;
  movie: Movie;
  cinemaRoom: CinemaRoom;
  startTime: Date;
}
