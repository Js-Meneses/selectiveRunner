import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature008Service } from './showcase-feature-008.service';

describe('ShowcaseFeature008Service', () => {
  let service: ShowcaseFeature008Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature008Service],
    });
    service = TestBed.inject(ShowcaseFeature008Service);
  });

  itEach(buildSyntheticCases(8), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    });
});
