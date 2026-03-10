import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard007Component } from './showcase-card-007.component';

describe('ShowcaseCard007Component', () => {
  let component: ShowcaseCard007Component;
  let fixture: ComponentFixture<ShowcaseCard007Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard007Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard007Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(52))(
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
