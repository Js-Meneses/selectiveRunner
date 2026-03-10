import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard005Component } from './showcase-card-005.component';

describe('ShowcaseCard005Component', () => {
  let component: ShowcaseCard005Component;
  let fixture: ComponentFixture<ShowcaseCard005Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard005Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard005Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(50), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
