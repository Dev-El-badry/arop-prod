import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmesMedicalComponent } from './smes-medical.component';

describe('SmesMedicalComponent', () => {
  let component: SmesMedicalComponent;
  let fixture: ComponentFixture<SmesMedicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmesMedicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmesMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
