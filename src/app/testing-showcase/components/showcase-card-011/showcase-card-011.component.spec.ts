import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard011Component } from './showcase-card-011.component';

describe('ShowcaseCard011Component', () => {
  let component: ShowcaseCard011Component;
  let fixture: ComponentFixture<ShowcaseCard011Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard011Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard011Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(56), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
