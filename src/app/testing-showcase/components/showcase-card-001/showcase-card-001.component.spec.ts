import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard001Component } from './showcase-card-001.component';

describe('ShowcaseCard001Component', () => {
  let component: ShowcaseCard001Component;
  let fixture: ComponentFixture<ShowcaseCard001Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard001Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard001Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(46), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
