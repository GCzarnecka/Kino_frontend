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
  getMovie(id: number) {
    return this.restService.get<Movie>("api/movie/"+id);
  }

  postMovie(movie: Movie) {
    return this.restService.post<Movie>("api/movies", movie);
  }
}
