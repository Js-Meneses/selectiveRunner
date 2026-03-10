import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ShowcaseFeature038Service } from './showcase-feature-038.service';

describe('ShowcaseFeature038Service', () => {
  let service: ShowcaseFeature038Service;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowcaseFeature038Service);
  });

  it.each(buildSyntheticCases(38))(
    'resuelve el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    },
  );
});
