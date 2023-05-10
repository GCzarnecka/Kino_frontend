import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {Screening} from "../DataModel/Screening";

@Injectable({
  providedIn: 'root'
})
export class ScreeningsService {

  constructor(private restService: RestService) { }

  getScreeningsForMovie(movieId: number) {
    return this.restService.get<Screening[]>("api/screenings", {movieId: movieId});
  }

}
