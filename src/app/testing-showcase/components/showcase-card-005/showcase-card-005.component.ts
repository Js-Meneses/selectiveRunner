import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-005',
  standalone: true,
  templateUrl: './showcase-card-005.component.html',
  styleUrl: './showcase-card-005.component.scss',
})
export class ShowcaseCard005Component {
  @Input() seed = 50;

  readonly featureIndex = 50;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
