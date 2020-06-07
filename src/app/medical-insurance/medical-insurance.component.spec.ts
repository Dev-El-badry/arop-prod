import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInsuranceComponent } from './medical-insurance.component';

describe('MedicalInsuranceComponent', () => {
  let component: MedicalInsuranceComponent;
  let fixture: ComponentFixture<MedicalInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
