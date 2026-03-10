import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature020Service } from './showcase-feature-020.service';

describe('ShowcaseFeature020Service', () => {
  let service: ShowcaseFeature020Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcaseFeature020Service);
  });

  it.each(buildSyntheticCases(20))(
    'resuelve el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    },
  );
});
