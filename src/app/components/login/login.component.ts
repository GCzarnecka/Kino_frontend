import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);

      this.authService.login(this.form.value.username, this.form.value.password).subscribe(
        token => {
          console.log(token);
          localStorage.setItem('authToken', token.token);
          // window.location.reload();
        }
      );

    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();

}
