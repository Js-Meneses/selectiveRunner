import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature026Service } from './showcase-feature-026.service';

describe('ShowcaseFeature026Service', () => {
  let service: ShowcaseFeature026Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature026Service],
    });
    service = TestBed.inject(ShowcaseFeature026Service);
  });

  itEach(buildSyntheticCases(26), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    });
});
