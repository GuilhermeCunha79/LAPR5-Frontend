import { Component, OnInit } from '@angular/core';
import {Planning} from "../domain/Planning";
import {PlanningService} from "../services/planning/planning.service";

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.css']
})
export class CreatePlanningComponent implements OnInit {

  licensePlate: string;
  date: string;
  warehouse: string;
  heuristic: string = "1";
  delivery: string;
  pipe=false;

  searchLicensePlate: string;
  searchDate: string;

  searchDelivery: string;
  searchWarehouse: string;

  listSize: number = 10;
  pageNumber: number = 1;


  plannings: Planning[];

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.planningService.getPlanning().subscribe((obj) => this.plannings = obj);
  }

  public createPlanning(): void {
    // @ts-ignore
    this.planningService.createValidPlanning( this.licensePlate, this.date,this.heuristic).subscribe();
    setTimeout(window.location.reload.bind(window.location), 200);
  }



  public onPipe(){
    this.pipe=true;
  }

  public ofPipe(){
    this.pipe=false;
  }


  changePage(right: boolean): void {
    if (right) {
      this.pageNumber++;

      const maxPageNumber = Math.ceil(this.plannings.length/this.listSize);
      if (this.pageNumber > maxPageNumber) this.pageNumber = maxPageNumber;
    }
    else {
      this.pageNumber--;

      if (this.pageNumber < 1) this.pageNumber = 1;
    }
  }




}
