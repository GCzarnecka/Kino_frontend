import { Component } from '@angular/core';
import {Seat} from "../../DataModel/Seat";
import {UserService} from "../../services/user.service";
import {User} from "../../DataModel/User";
import {Reservation} from "../../DataModel/Reservation";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {


  constructor(private userService: UserService) {
  }

  user!: User;

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user
      console.log(this.user)
    });

  }

  pay(reservation: Reservation) {

  }
}
