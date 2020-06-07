import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTicketComponent } from './group-ticket.component';

describe('GroupTicketComponent', () => {
  let component: GroupTicketComponent;
  let fixture: ComponentFixture<GroupTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
