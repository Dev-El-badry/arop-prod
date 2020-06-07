import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcessComponent } from './excess.component';

describe('ExcessComponent', () => {
  let component: ExcessComponent;
  let fixture: ComponentFixture<ExcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
