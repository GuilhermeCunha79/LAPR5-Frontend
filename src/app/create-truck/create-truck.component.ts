import {Component, OnInit} from '@angular/core';
import {TruckService} from "../services/TruckService";

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})

export class CreateTruckComponent implements OnInit {

  truck: Truck;
  licensePlate: string;
  autonomy: number;
  capacityCargo: number;
  capacityTransportation: number;
  battery: number;
  tare: number;

  constructor(private truckService: TruckService) {
  }

  ngOnInit(): void {
    this.listTable();
  }

  public createValidTruck(): void {

    this.truckService.createValidTruck(this.licensePlate, this.autonomy, this.capacityCargo, this.capacityTransportation, this.battery, this.tare);

  }

  public createTruck(): void {

    this.truckService.createTruck(this.licensePlate, this.autonomy, this.capacityCargo, this.capacityTransportation, this.battery, this.tare).subscribe(data => {
      this.truck = data;
    });
    setTimeout(window.location.reload.bind(window.location), 200);
  }

  public listTable(): void {
    this.truckService.listTable();
  }


}
