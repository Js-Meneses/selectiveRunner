import { Injectable } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Injectable({ providedIn: 'root' })
export class ShowcaseFeature043Service {
  readonly featureIndex = 43;

  score(seed: number): number {
    return calculateSyntheticScore(this.featureIndex, seed);
  }

  label(seed: number): string {
    return buildSyntheticLabel(this.featureIndex, seed);
  }
}
