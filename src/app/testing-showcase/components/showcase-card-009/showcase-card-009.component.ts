import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-009',
  standalone: true,
  templateUrl: './showcase-card-009.component.html',
  styleUrl: './showcase-card-009.component.scss',
})
export class ShowcaseCard009Component {
  @Input() seed = 54;

  readonly featureIndex = 54;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
