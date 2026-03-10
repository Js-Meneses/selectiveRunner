import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature031Service } from './showcase-feature-031.service';

describe('ShowcaseFeature031Service', () => {
  let service: ShowcaseFeature031Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcaseFeature031Service);
  });

  it.each(buildSyntheticCases(31))(
    'resuelve el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    },
  );
});
