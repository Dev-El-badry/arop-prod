import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalQuoteComponent } from './personal-quote.component';

describe('PersonalQuoteComponent', () => {
  let component: PersonalQuoteComponent;
  let fixture: ComponentFixture<PersonalQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
