import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard006Component } from './showcase-card-006.component';

describe('ShowcaseCard006Component', () => {
  let component: ShowcaseCard006Component;
  let fixture: ComponentFixture<ShowcaseCard006Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard006Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard006Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(51), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
