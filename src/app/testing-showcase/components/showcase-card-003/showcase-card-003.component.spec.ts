import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard003Component } from './showcase-card-003.component';

describe('ShowcaseCard003Component', () => {
  let component: ShowcaseCard003Component;
  let fixture: ComponentFixture<ShowcaseCard003Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard003Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard003Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(48))(
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
