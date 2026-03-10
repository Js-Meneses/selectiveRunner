import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard009Component } from './showcase-card-009.component';

describe('ShowcaseCard009Component', () => {
  let component: ShowcaseCard009Component;
  let fixture: ComponentFixture<ShowcaseCard009Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard009Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard009Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(54))(
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
