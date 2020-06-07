import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMedicalComponent } from './family-medical.component';

describe('FamilyMedicalComponent', () => {
  let component: FamilyMedicalComponent;
  let fixture: ComponentFixture<FamilyMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
