import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature043Service } from './showcase-feature-043.service';

describe('ShowcaseFeature043Service', () => {
  let service: ShowcaseFeature043Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcaseFeature043Service);
  });

  it.each(buildSyntheticCases(43))(
    'resuelve el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    },
  );
});
