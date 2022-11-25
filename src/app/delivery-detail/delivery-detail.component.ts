import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Delivery } from '../delivery';
import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-delivery-detail',
  templateUrl: './delivery-detail.component.html',
  styleUrls: [ './delivery-detail.component.css' ]
})
export class DeliveryDetailComponent implements OnInit {
  delivery: Delivery | undefined;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDelivery();
  }

  getDelivery(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.deliveryService.getDelivery(id)
      .subscribe(delivery => this.delivery = delivery);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.delivery) {
      this.deliveryService.updateDelivery(this.delivery)
        .subscribe(() => this.goBack());
    }
  }
}
