import {TestBed} from '@angular/core/testing';

import {WarehouseService} from './warehouse.service';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Warehouse} from "../../domain/Warehouse";

describe('WarehouseService', () => {
  let service: WarehouseService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WarehouseService
        //HttpErrorHandler

      ]
    });
    service = TestBed.inject(WarehouseService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('#criarArmazem', () => {

    it('deve criar um armazem e retorná-lo', () => {

      const c: Warehouse = {
        warehouseIdentifier: "7D2",
        designation: "Warehouse",
        street: "Rua das Oliveiras",
        number: 2,
        postalCode: "3610-981",
        country: "Portugal,Porto",
        latitude: 23,
        longitude: 33,
        altitude: 4
      };

      service.createWarehouse(c.warehouseIdentifier, c.designation, c.street, c.number, c.postalCode, c.country, c.latitude, c.longitude, c.altitude).subscribe(
        data => expect(data).toEqual(c, 'should return the Driver'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.Url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(c);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        {status: 200, statusText: 'OK', body: c});
      req.event(expectedResponse);
    });
  });


});

