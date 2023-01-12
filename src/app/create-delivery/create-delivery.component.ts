import {Component, OnInit} from '@angular/core';
import {Delivery} from "../domain/Delivery";
import {DeliveryService} from "../services/delivery/delivery.service";

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css']
})

export class CreateDeliveryComponent implements OnInit {

  pipe=false;

  delivery: Delivery;
  deliveryIdentifier: string;
  day: number;
  month: string;
  year: number;
  mass: number;
  placingTime: number;
  storeId: string;
  withdrawalTime: number;

  searchDeliveryIdentifier: string;
  searchDay: number;
  searchMonth: string;
  searchYear: number;
  searchMass: number;
  searchPlacingTime: number;
  searchStoreId: string;
  searchWithdrawalTime: number;

  deliveries: Delivery[] = [];
  pageNumber: number = 1;
  permissions: number[] = [1,4];

  constructor(private deliveryService: DeliveryService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkPermission(this.permissions);
    this.getDeliveries();
  }

  public createValidDelivery(): void {


    // @ts-ignore
    this.deliveryService.createValidDelivery(this.deliveryIdentifier, this.day, this.month, this.year, this.mass, this.placingTime, this.storeId, this.withdrawalTime).subscribe(data => {
      this.delivery = data
    });
    setTimeout(window.location.reload.bind(window.location), 200);

  }

  public createDelivery(): void {
    this.deliveryService.createDelivery(this.deliveryIdentifier, this.day, this.month, this.year, this.mass, this.placingTime, this.storeId, this.withdrawalTime).subscribe(data => {console.log(data);
      this.delivery = data
    });
  }

  public getDeliveries(): void {

    this.deliveryService.getDeliveries().subscribe(data => {
      this.deliveries = data;
    });
  }

  public listTable(): void {
    this.deliveryService.listTable();

  }

  public onPipe(){
    this.pipe=true;
  }

  public ofPipe(){
    this.pipe=false;
  }



}
