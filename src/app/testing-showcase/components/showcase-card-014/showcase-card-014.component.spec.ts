import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard014Component } from './showcase-card-014.component';

describe('ShowcaseCard014Component', () => {
  let component: ShowcaseCard014Component;
  let fixture: ComponentFixture<ShowcaseCard014Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard014Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard014Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(59))(
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
