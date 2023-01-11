import {Component, OnInit} from '@angular/core';

import {PlanningService} from "../services/planning/planning.service";
import {Planning} from "../domain/Planning";

@Component({
  selector: 'app-signup-screen',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})

export class SimComponent implements OnInit {

  plannings: Planning[];

  constructor( private planningService: PlanningService) {
  }

  ngOnInit(): void {

    this.planningService.getPlanning().subscribe((obj) => this.plannings = obj);

  }



}
