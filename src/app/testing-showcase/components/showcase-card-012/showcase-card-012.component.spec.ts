import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard012Component } from './showcase-card-012.component';

describe('ShowcaseCard012Component', () => {
  let component: ShowcaseCard012Component;
  let fixture: ComponentFixture<ShowcaseCard012Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard012Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard012Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(57), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
