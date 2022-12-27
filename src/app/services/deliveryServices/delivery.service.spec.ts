import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {DeliveryService} from "./delivery.service";

import {Delivery} from "../../domain/delivery";

describe('DeliveryService', () => {
  let service: DeliveryService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[DeliveryService]
    });

    service = TestBed.inject(DeliveryService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#criarEntrega', () => {

    it('deve criar uma Entrega e retorná-la', () => {

      const c: Delivery = {
        deliveryIdentifier: "1234",
        day: 23,
        month: "november",
        year: 2022,
        mass: 23,
        placingTime: 2,
        storeId: "XXX",
        withdrawalTime: 3
      };

      service.createDelivery(c.deliveryIdentifier, c.day, c.month, c.year, c.mass, c.placingTime,c.storeId,c.withdrawalTime).subscribe(
        data => expect(data).toEqual(c, 'should return the Driver'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.Url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(c);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: c });
      req.event(expectedResponse);
    });
  });
});
