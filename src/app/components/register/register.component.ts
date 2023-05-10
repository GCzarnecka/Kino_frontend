import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  });


  constructor(private authService : AuthService, private router: Router) { }

  submit() {
    console.log(this.form.valid, this.error);
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      this.authService.register(this.form.value).pipe(catchError(err => {
        console.log('blaad',err.error);
        this.error = err.error;
        throw err;
      })).subscribe(
        token => {
          console.log(token.token);
          localStorage.setItem('authToken', token.token);
          this.router.navigate(['/', 'home']);
          // window.location.reload();


        }
      );

    }
    else {
      this.error = 'Invalid form';
    }
  }
  @Input() error: string | null = null;

  @Output() submitEM = new EventEmitter();
}
