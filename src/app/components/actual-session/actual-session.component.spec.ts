import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualSessionComponent } from './actual-session.component';

describe('ActualSessionComponent', () => {
  let component: ActualSessionComponent;
  let fixture: ComponentFixture<ActualSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
