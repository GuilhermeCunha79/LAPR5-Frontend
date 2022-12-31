import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {

  email: string;
  password: string;

  constructor(private signupService: AuthService) {
  }

  ngOnInit(): void {
    this.signupService.redirectToHome();
  }

  login(): void {
    if (this.signupService.login(this.email, this.password)) {
      this.signupService.getUser(this.email, this.password)?.subscribe(obj => {
        console.log(obj)
        sessionStorage.setItem("user-data", JSON.stringify(obj));
        this.signupService.redirectToHome();
      });
    }
  }
}
