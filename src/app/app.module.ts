import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HomeComponent } from './components/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MovieComponent } from './components/movie/movie.component';
import {MatCard, MatCardModule} from "@angular/material/card";
import {NgImageSliderModule} from "ng-image-slider";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatInput, MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app-routing.module";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { LoggedControllsComponent } from './components/logged-controlls/logged-controlls.component';
import {AuthInterceptor} from "./services/auth-interceptor.interceptor";
import { UserSettingsComponent } from './components/user-settings/user-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomeComponent,
    NavbarComponent,
    MovieComponent,
    LoginComponent,
    RegisterComponent,
    MovieDetailsComponent,
    LoggedControllsComponent,
    UserSettingsComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatCardModule,
        NgImageSliderModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        AppRoutingModule,
        MatIconModule,
        MatGridListModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }