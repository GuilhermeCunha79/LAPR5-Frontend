import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  links: any[] = [
    {"route": "/login", "icon": "icon-account.png", "description": "Login"},
    {"route": "/delivery", "icon": "icon-delivery.png", "description": "Deliveries"},
    {"route": "/planning", "icon": "icon-planning.png", "description": "Planning"},
    {"route": "/route", "icon": "icon-route.png", "description": "Routes"},
    {"route": "/truck", "icon": "icon-truck.png", "description": "Trucks"},
    {"route": "/warehouse", "icon": "icon-warehouse.png", "description": "Warehouses"},
    {"route": "/road-network", "icon": "icon-network.png", "description": "Network"}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
