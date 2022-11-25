import { Component, OnInit } from '@angular/core';

import { Delivery } from '../delivery';
import {DeliveryService} from "../delivery.service";

@Component({
  selector: 'app-deliveries',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveries: Delivery[] = [];

  constructor(private deliveryService: DeliveryService) { }

  ngOnInit(): void {
    this.getDeliveries();
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries()
      .subscribe(deliveries => this.deliveries = deliveries);
  }

  add(id: string): void {
    id = id.trim();
    if (!id) { return; }
    this.deliveryService.addDeliveries({id} as unknown as Delivery)
      .subscribe(delivery => {
        this.deliveries.push(delivery);
      });
  }

  delete(delivery: Delivery): void {
    this.deliveries = this.deliveries.filter(h => h !== delivery);
    this.deliveryService.deleteDelivery(delivery.id).subscribe();
  }

}
