import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-006',
  standalone: true,
  templateUrl: './showcase-card-006.component.html',
  styleUrl: './showcase-card-006.component.scss',
})
export class ShowcaseCard006Component {
  @Input() seed = 51;

  readonly featureIndex = 51;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
