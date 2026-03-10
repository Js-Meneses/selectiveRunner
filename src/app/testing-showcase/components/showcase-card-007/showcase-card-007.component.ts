import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-007',
  standalone: true,
  templateUrl: './showcase-card-007.component.html',
  styleUrl: './showcase-card-007.component.scss',
})
export class ShowcaseCard007Component {
  @Input() seed = 52;

  readonly featureIndex = 52;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
