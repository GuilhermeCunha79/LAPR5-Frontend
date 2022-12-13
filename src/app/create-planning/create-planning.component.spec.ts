import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,} from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import {FilterPipe} from "../domain/filterPipe";
import { CreatePlanningComponent } from './create-planning.component';

describe('CreatePlanningComponent', () => {
  let component: CreatePlanningComponent;
  let fixture: ComponentFixture<CreatePlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlanningComponent, FilterPipe],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
