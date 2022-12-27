import {Component, OnInit} from '@angular/core';
import {TruckService} from "../services/truck/truck.service";
import {Truck} from "../domain/Truck";

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})

export class CreateTruckComponent implements OnInit {

  truck: Truck;

  searchLicensePlate: string;
  searchAutonomy: string;
  searchCapacityCargo: string;
  searchCapacityTransportation: string;
  searchBattery: string;
  searchTare: string;

  trucks: Truck [];
  licensePlate: string;
  autonomy: number;
  capacityCargo: number;
  capacityTransportation: number;
  battery: number;
  tare: number;

  constructor(private truckService: TruckService) {
  }

  ngOnInit(): void {
   // this.listTable();
    this.getTrucks();
  }

 public createValidTruck(): void {


    // @ts-ignore
    this.truckService.createValidTruck(this.licensePlate, this.autonomy, this.capacityCargo, this.capacityTransportation, this.battery, this.tare).subscribe(data => {
      this.truck = data;
    });
    setTimeout(window.location.reload.bind(window.location), 200);

  }


  public getTrucks(): void {

    this.truckService.getTrucks().subscribe(data => {
      this.trucks = data;
    });
  }

  public createTruck(): void {

    this.truckService.createTruck(this.licensePlate, this.autonomy, this.capacityCargo, this.capacityTransportation, this.battery, this.tare).subscribe(data => {
      this.truck = data;
    });
    setTimeout(window.location.reload.bind(window.location), 200);
  }

  public listTable(): void {

    this.truckService.listTable().subscribe(data => {
      this.trucks = data  });
   // this.trucks= this.truckService.listTable();

  }




}
