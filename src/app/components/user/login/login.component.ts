import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDTO} from "../../../dtos/login-dto.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    });
  }

  signInButton() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);
      this.userService.login(user).subscribe(
        {
          next: response => {
            console.log("User is login", response);
            this.router.navigate(['/home'])
          },
          error: err => {
            console.log("Error when login", err);
          }
        }
      )
    }
  }
}
