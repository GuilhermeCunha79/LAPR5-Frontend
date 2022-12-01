import {Component, OnInit} from '@angular/core';
import {RouteService} from "../services/RouteService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})

export class RouteComponent implements OnInit {

  routeId: string;
  origin: string;
  destination: string;
  distance: number;
  timeDistance: number;
  energySpent: number;
  extraBatteryTime: number;

  params: any;

  constructor(private routesService: RouteService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => this.params = params);
  }

  ngOnInit(): void {
    this.fillRouteTable();
  }

  public createRoute(): void {
    this.routesService.createRoute(this.routeId, this.origin, this.destination, this.distance, this.timeDistance, this.energySpent, this.extraBatteryTime);
    setTimeout(window.location.reload.bind(window.location), 200);
  }

  public fillRouteTable(): void {
    this.routesService.fillRouteTable(this.params);
  }
}
