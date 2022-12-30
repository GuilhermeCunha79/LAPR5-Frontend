import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})

export class LoginScreenComponent implements OnInit {

  email: string;
  password: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  login(): void {
  }

  signup(): void {
  }
}
