import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogReservationComponent} from "../dialog-reservation/dialog-reservation.component";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{

  public token: string | null = null;

  public isAdmin: boolean = false;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this.getToken();
    this.userService.getUser().subscribe(user => {
      this.isAdmin = user.role === 'ADMIN';
      // console.log(user);
    });
    // this.userService.getUser(
    // ).subscribe( user => {
    //   this.isAdmin = user.isAdmin
    // });
  }

  ngDoCheck(): void {
    this.token = this.getToken()
  }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  admin() {
    const dialogRef = this.dialog.open(AdminPanelComponent, {

    });

    dialogRef.afterClosed().subscribe();
  }

}
