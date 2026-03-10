import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-011',
  standalone: true,
  templateUrl: './showcase-card-011.component.html',
  styleUrl: './showcase-card-011.component.scss',
})
export class ShowcaseCard011Component {
  @Input() seed = 56;

  readonly featureIndex = 56;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
