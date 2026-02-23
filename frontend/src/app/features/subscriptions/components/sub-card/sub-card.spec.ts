import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCard } from './sub-card';

describe('SubCard', () => {
  let component: SubCard;
  let fixture: ComponentFixture<SubCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
