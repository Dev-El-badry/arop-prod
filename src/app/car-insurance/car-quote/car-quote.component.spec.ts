import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarQuoteComponent } from './car-quote.component';

describe('CarQuoteComponent', () => {
  let component: CarQuoteComponent;
  let fixture: ComponentFixture<CarQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
