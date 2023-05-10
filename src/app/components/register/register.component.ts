import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl(),
  });


  constructor(private authService : AuthService, private router: Router) { }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      this.authService.register(this.form.value).subscribe(
        token => {
          console.log(token.token);
          localStorage.setItem('authToken', token.token);
          this.router.navigate(['/', 'home']);
          // window.location.reload();

        }
      );

    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
