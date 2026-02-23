import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDashboard } from './sub-dashboard';

describe('SubDashboard', () => {
  let component: SubDashboard;
  let fixture: ComponentFixture<SubDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
