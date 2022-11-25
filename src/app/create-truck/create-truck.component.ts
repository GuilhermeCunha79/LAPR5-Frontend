import { Component, OnInit } from '@angular/core';
import {TrucksService} from "../services/TrucksService";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})
export class CreateTruckComponent implements OnInit {

  truck: Truck;
  licensePlate: string;
  autonomy:number ;
  capacityCargo: number ;
  capacityTransportation: number ;
  battery: number;
  tare: number;

  constructor(private truckService: TrucksService, private route: ActivatedRoute, private router: Router) {


  }
  ngOnInit(): void {
    this.listTable();
  }

  public createTruck() : void {
    this.truckService.createTruck(this.licensePlate, this.autonomy, this.capacityCargo, this.capacityTransportation, this.battery, this.tare).subscribe(data => {console.log(data)
    this.truck=data});
  }

  public listTable(): void {
    this.truckService.listTable();

  }

}



