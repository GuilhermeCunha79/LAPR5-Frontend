import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {TruckService} from "./truck.service";

import { Truck}  from "src/app/domain/Truck";

describe('CamiaoService', () => {
  let service: TruckService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        TruckService
        //HttpErrorHandler

      ]
    });
    service = TestBed.inject(TruckService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('#criarCamiao', () => {

    it('deve criar um Camião e retorná-lo', () => {

      const c: Truck = {
        //name: "n1",
        //birthdate: "2020-12-30",
        //driverLicenseNum: 12345,
        //licenseExpiration: "2020-12-30"
        licensePlate: "DD-06-FF",
        autonomy:100,
        capacityCargo:900,
        capacityTransportation:60,
        battery: 20,
        tare:23
      };

      service.createTruck(c.licensePlate,c.autonomy, c.capacityCargo, c.capacityTransportation,
      c.battery, c.tare).subscribe(
        data => expect(data).toEqual(c, 'should return the Driver'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(service.Url);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(c);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: c });
      req.event(expectedResponse);
    });
  });


});
