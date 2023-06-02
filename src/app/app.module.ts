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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from "./app-routing.module";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import {MatGridListModule} from "@angular/material/grid-list";
import { LoggedControllsComponent } from './components/logged-controlls/logged-controlls.component';
import {AuthInterceptor} from "./services/auth-interceptor.interceptor";
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { DialogReservationComponent } from './components/dialog-reservation/dialog-reservation.component';
import {MatDialogModule} from "@angular/material/dialog";
import { SelectSeatsComponent } from './components/select-seats/select-seats.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import {MatSelectModule} from "@angular/material/select";
import { LogoComponent } from './components/logo/logo.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { MovieFilterPipe } from './components/movies/movie-filter.pipe';
import { QRCodeModule } from 'angularx-qrcode';
import { DialogTicketComponent } from './components/dialog-ticket/dialog-ticket.component';
import { ScreeningInfoComponent } from './components/screening-info/screening-info.component';
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";

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
    UserSettingsComponent,
    DialogReservationComponent,
    SelectSeatsComponent,
    AdminPanelComponent,
    MovieInfoComponent,
    LogoComponent,
    MovieFilterPipe,
    DialogTicketComponent,
    ScreeningInfoComponent
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
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    QRCodeModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
