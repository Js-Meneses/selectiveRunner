import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature019Service } from './showcase-feature-019.service';

describe('ShowcaseFeature019Service', () => {
  let service: ShowcaseFeature019Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature019Service],
    });
    service = TestBed.inject(ShowcaseFeature019Service);
  });

  itEach(buildSyntheticCases(19), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    });
});
