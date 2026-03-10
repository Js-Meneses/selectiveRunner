import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard010Component } from './showcase-card-010.component';

describe('ShowcaseCard010Component', () => {
  let component: ShowcaseCard010Component;
  let fixture: ComponentFixture<ShowcaseCard010Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard010Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard010Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(55))(
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
