import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Movie} from "../DataModel/Movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private restService: RestService) { }

  getMovies() {
    return this.restService.get<Movie[]>("api/movies");
  }

  postMovie(movie: Movie) {
    return this.restService.post<Movie>("api/movies", movie);
  }
}
