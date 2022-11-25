import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Delivery } from './delivery';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const deliveries = [
      { id: 242, day:23,month:'december',year:2022, mass: 2, wId:'123', withdrawalTime: 23, deliveryTime:11}
    ];
    return {deliveries};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the deliveries array is empty,
  // the method below returns the initial number (11).
  // if the deliveries array is not empty, the method below returns the highest
  // deliverY id + 1.
  genId(deliveries: Delivery[]): number {
    return deliveries.length > 0 ? Math.max(...deliveries.map(delivery => delivery.id)) + 1 : 11;
  }
}
