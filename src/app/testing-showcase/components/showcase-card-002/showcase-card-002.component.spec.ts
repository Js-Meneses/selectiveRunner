import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseCard002Component } from './showcase-card-002.component';

describe('ShowcaseCard002Component', () => {
  let component: ShowcaseCard002Component;
  let fixture: ComponentFixture<ShowcaseCard002Component>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseCard002Component],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowcaseCard002Component);
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(47))(
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
