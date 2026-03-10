import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard013Component } from './showcase-card-013.component';

describe('ShowcaseCard013Component', () => {
  let component: ShowcaseCard013Component;
  let fixture: ComponentFixture<ShowcaseCard013Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard013Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard013Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(58), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
