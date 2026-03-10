import { Injectable } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Injectable({ providedIn: 'root' })
export class ShowcaseFeature002Service {
  readonly featureIndex = 2;

  score(seed: number): number {
    return calculateSyntheticScore(this.featureIndex, seed);
  }

  label(seed: number): string {
    return buildSyntheticLabel(this.featureIndex, seed);
  }
}
