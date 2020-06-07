import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalQuoteComponent } from './medical-quote.component';

describe('MedicalQuoteComponent', () => {
  let component: MedicalQuoteComponent;
  let fixture: ComponentFixture<MedicalQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
