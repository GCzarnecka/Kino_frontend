import {LoginComponent} from "./components/login/login.component";
import {MoviesComponent} from "./components/movies/movies.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MovieDetailsComponent} from "./components/movie-details/movie-details.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MoviesComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: HomeComponent},
  {path: 'account', component: UserSettingsComponent},
  {path: 'movie-details/:id', component: MovieDetailsComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
