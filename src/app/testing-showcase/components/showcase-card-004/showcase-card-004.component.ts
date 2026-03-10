import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-004',
  standalone: true,
  templateUrl: './showcase-card-004.component.html',
  styleUrl: './showcase-card-004.component.scss',
})
export class ShowcaseCard004Component {
  @Input() seed = 49;

  readonly featureIndex = 49;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
