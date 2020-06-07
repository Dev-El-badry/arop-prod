import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualMedicalComponent } from './individual-medical.component';

describe('IndividualMedicalComponent', () => {
  let component: IndividualMedicalComponent;
  let fixture: ComponentFixture<IndividualMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
