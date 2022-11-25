import { Component, OnInit } from '@angular/core';
import {RouteService} from "./route.service";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})

export class RouteComponent implements OnInit {

  route: Route;
  routeId: string;
  origin: string;
  destination: string;
  distance: number;
  timeDistance: number;
  energySpent: number;
  extraTimeBattery: number;

  constructor(private routesService: RouteService) { }

  ngOnInit(): void {
    this.fillRouteTable();
  }

  public createRoute(): void {
    this.routesService.createRoute(  this.routeId, this.origin, this.destination, this.distance, this.timeDistance, this.energySpent, this.extraTimeBattery).subscribe(obj => {
      this.route = obj;
    });
  }

  public fillRouteTable(): void {
    this.routesService.fillRouteTable();
  }
}
