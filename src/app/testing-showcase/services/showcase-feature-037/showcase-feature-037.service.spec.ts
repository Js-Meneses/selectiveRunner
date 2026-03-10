import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature037Service } from './showcase-feature-037.service';

describe('ShowcaseFeature037Service', () => {
  let service: ShowcaseFeature037Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature037Service],
    });
    service = TestBed.inject(ShowcaseFeature037Service);
  });

  itEach(buildSyntheticCases(37), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    });
});
