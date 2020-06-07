import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalResultComponent } from './personal-result.component';

describe('PersonalResultComponent', () => {
  let component: PersonalResultComponent;
  let fixture: ComponentFixture<PersonalResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
