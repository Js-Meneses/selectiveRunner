import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  itEach,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature001Service } from './showcase-feature-001.service';

describe('ShowcaseFeature001Service', () => {
  let service: ShowcaseFeature001Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowcaseFeature001Service],
    });
    service = TestBed.inject(ShowcaseFeature001Service);
  });

  itEach(buildSyntheticCases(1), 'resuelve el caso %#', ({ expectedLabel, expectedScore, seed }) => {
    expect(service.score(seed)).toBe(expectedScore);
    expect(service.label(seed)).toBe(expectedLabel);
  });
});
