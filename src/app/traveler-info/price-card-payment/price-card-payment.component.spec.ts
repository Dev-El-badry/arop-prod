import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCardPaymentComponent } from './price-card-payment.component';

describe('PriceCardPaymentComponent', () => {
  let component: PriceCardPaymentComponent;
  let fixture: ComponentFixture<PriceCardPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCardPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
