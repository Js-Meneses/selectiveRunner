import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature015Service } from './showcase-feature-015.service';

describe('ShowcaseFeature015Service', () => {
  let service: ShowcaseFeature015Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature015Service],
    });
    service = TestBed.inject(ShowcaseFeature015Service);
  });

  itEach(buildSyntheticCases(15), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    });
});
