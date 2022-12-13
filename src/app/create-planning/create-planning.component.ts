import { Component, OnInit } from '@angular/core';
import {Planning} from "../domain/Planning";
import {PlanningService} from "../services/PlanningService/planning.service";

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.css']
})
export class CreatePlanningComponent implements OnInit {

  planningId: string;
  licensePlate: string;
  date: string;
  warehouse: string;

  searchPlanningId: string;
  searchLicensePlate: string;
  searchDate: string;
  searchWarehouse: string;

  plannings: Planning[];

  constructor(private planningService: PlanningService) { }

  ngOnInit(): void {
    this.planningService.getPlanning().subscribe((obj) => this.plannings = obj);
  }

  public createPlanning(): void {
    // @ts-ignore
    this.planningService.createValidPlanning(this.planningId, this.licensePlate, this.date).subscribe();
    setTimeout(window.location.reload.bind(window.location), 200);
  }
}
