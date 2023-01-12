import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  links: any[] = [
    {"route": "/delivery", "icon": "icon-delivery.png", "description": "Deliveries", "roles": [1,4]},
    {"route": "/planning", "icon": "icon-planning.png", "description": "Planning", "roles": [2,4]},
    {"route": "/route", "icon": "icon-route.png", "description": "Routes", "roles": [2,4]},
    {"route": "/truck", "icon": "icon-truck.png", "description": "Trucks", "roles": [3,4]},
    {"route": "/warehouse", "icon": "icon-warehouse.png", "description": "Warehouses", "roles": [1,4]},
    {"route": "/road-network", "icon": "icon-network.png", "description": "Network", "roles": [2,4]},
    {"route": "/user", "icon": "icon-users.png", "description": "Users", "roles": [4]},
    {"route": "/sim", "icon": "icon-simulation.png", "description": "Simulation", "roles": [4]}
  ];

  roles: string[] = [
    "Warehouse Manager",
    "Logistics Manager",
    "Fleet Manager",
    "Administrator",
  ];

  userData: any;
  name: string;

  constructor(private signupService: AuthService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("user-data")) {
      this.userData = JSON.parse(sessionStorage.getItem("user-data")!);
      this.name = this.userData.firstName + " " + this.userData.lastName;
    }
  }


  public cancelUser(email:string,firstName:string,lastName:string,phoneNumber:string,role:number): void {
    this.signupService.cancelUser1(email,firstName,lastName,phoneNumber,role).subscribe(data => {
      this.userData = data;
    });
    setTimeout(window.location.reload.bind(window.location), 500);
  }


  logout() {
    sessionStorage.removeItem("user-data");
    this.signupService.redirectToLogin();
  }
}
