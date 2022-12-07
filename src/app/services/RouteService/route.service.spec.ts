import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {RouteService} from "./route.service";
//import {FilterPipe} from "../../domain/filterPipe";

import { Route}  from "src/app/domain/Route";

describe('RouteService', () => {
  let service: RouteService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[RouteService]
    });

    service = TestBed.inject(RouteService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Service should be created.', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('Create Route.', () => {

    it('Should create and return a Route.', () => {

      const c: Route = {
        routeId: "88",
        origin: "XYZ",
        destination: "ZYX",
        distance: 10,
        timeDistance: 10,
        energySpent: 10,
        extraBatteryTime: 10
      };

      service.createRoute(c.routeId, c.origin, c.destination, c.distance, c.timeDistance, c.energySpent, c.extraBatteryTime).subscribe(
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
