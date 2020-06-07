import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerInfoComponent } from './traveler-info.component';

describe('TravelerInfoComponent', () => {
  let component: TravelerInfoComponent;
  let fixture: ComponentFixture<TravelerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
