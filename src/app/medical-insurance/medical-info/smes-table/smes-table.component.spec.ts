import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmesTableComponent } from './smes-table.component';

describe('SmesTableComponent', () => {
  let component: SmesTableComponent;
  let fixture: ComponentFixture<SmesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
