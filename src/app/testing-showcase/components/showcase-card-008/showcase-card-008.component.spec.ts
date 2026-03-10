import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard008Component } from './showcase-card-008.component';

describe('ShowcaseCard008Component', () => {
  let component: ShowcaseCard008Component;
  let fixture: ComponentFixture<ShowcaseCard008Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard008Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard008Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(53))(
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
