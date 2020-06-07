import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupResComponent } from './group-res.component';

describe('GroupResComponent', () => {
  let component: GroupResComponent;
  let fixture: ComponentFixture<GroupResComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupResComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
