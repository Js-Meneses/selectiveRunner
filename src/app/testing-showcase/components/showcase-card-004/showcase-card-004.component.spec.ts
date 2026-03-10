import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard004Component } from './showcase-card-004.component';

describe('ShowcaseCard004Component', () => {
  let component: ShowcaseCard004Component;
  let fixture: ComponentFixture<ShowcaseCard004Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard004Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard004Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(49))(
    'renderiza el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    },
  );
});
