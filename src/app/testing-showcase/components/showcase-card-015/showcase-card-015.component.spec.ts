import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard015Component } from './showcase-card-015.component';

describe('ShowcaseCard015Component', () => {
  let component: ShowcaseCard015Component;
  let fixture: ComponentFixture<ShowcaseCard015Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard015Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard015Component);
    component = fixture.componentInstance;
  });

  itEach(buildSyntheticCases(60), 'renderiza el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    });
});
