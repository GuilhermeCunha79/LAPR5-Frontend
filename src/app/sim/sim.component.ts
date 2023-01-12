import {Component, OnInit} from '@angular/core';

import {PlanningService} from "../services/planning/planning.service";
import {Planning} from "../domain/Planning";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-signup-screen',
  templateUrl: './sim.component.html',
  styleUrls: ['./sim.component.css']
})

export class SimComponent implements OnInit {

  plannings: Planning[];

  permissions: number[] = [4];

  constructor( private planningService: PlanningService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.checkPermission(this.permissions);
    this.planningService.getPlanning().subscribe((obj) => this.plannings = obj);
  }
}
