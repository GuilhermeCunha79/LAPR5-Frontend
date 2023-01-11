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

  pipe=false;

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
  searchStatus: string;

  listSize: number = 10;
  pageNumber: number = 1;


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


  public activateTruck(licensePlate: string): void {

    this.truckService.activateByIdentifier(licensePlate).subscribe(data => {
      this.truck = data;
    });
    setTimeout(window.location.reload.bind(window.location), 500);
  }

  changePage(right: boolean): void {
    if (right) {
      this.pageNumber++;

      const maxPageNumber = Math.ceil(this.trucks.length/this.listSize);
      if (this.pageNumber > maxPageNumber) this.pageNumber = maxPageNumber;
    }
    else {
      this.pageNumber--;

      if (this.pageNumber < 1) this.pageNumber = 1;
    }
  }


  public onPipe(){
    this.pipe=true;
  }

  public ofPipe(){
    this.pipe=false;
  }


}
