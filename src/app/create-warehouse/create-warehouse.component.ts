import {Component, OnInit} from '@angular/core';
import {WarehouseService} from "../services/WarehouseService";

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})

export class CreateWarehouseComponent implements OnInit {

  warehouse: Warehouse;
  warehouseIdentifier: string;
  designation: string;
  street: string;
  number: number;
  postalCode: string;
  country: string;
  latitude: number;
  longitude: number;
  altitude: number;

  constructor(private warehouseService: WarehouseService) {
  }

  ngOnInit(): void {
    this.listTable();
  }

  public createValidWarehouse(): void {


    // @ts-ignore
    this.warehouseService.createValidWarehouse(this.warehouseIdentifier, this.designation, this.street, this.number, this.postalCode, this.country, this.latitude, this.longitude, this.altitude).subscribe(data => {
      this.warehouse = data
    });
    setTimeout(window.location.reload.bind(window.location), 200);

  }
  public createWarehouse(): void {
    this.warehouseService.createWarehouse(this.warehouseIdentifier, this.designation, this.street, this.number, this.postalCode, this.country, this.latitude, this.longitude, this.altitude).subscribe(data => {
      this.warehouse = data
    });
    setTimeout(window.location.reload.bind(window.location), 200);
  }

  public listTable(): void {
    this.warehouseService.listTable();
  }
}
