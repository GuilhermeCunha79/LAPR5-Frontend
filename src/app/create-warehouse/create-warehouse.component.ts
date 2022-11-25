import {Component, OnInit} from '@angular/core';
import {WarehouseService} from "./warehouse.service";
import {ActivatedRoute, Router} from "@angular/router";

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


  constructor(private warehouseService: WarehouseService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.listTable();
  }


  public createWarehouse(): void {
    this.warehouseService.createWarehouse(this.warehouseIdentifier, this.designation, this.street, this.number, this.postalCode, this.country, this.latitude, this.longitude, this.altitude).subscribe(data => {console.log(data);
      this.warehouse = data
    });
  }

  public listTable(): void {
    this.warehouseService.listTable();

  }



}
