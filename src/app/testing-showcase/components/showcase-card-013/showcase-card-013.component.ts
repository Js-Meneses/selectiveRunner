import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-013',
  standalone: true,
  templateUrl: './showcase-card-013.component.html',
  styleUrl: './showcase-card-013.component.scss',
})
export class ShowcaseCard013Component {
  @Input() seed = 58;

  readonly featureIndex = 58;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
