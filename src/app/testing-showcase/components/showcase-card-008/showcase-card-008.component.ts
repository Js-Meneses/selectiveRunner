import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-008',
  standalone: true,
  templateUrl: './showcase-card-008.component.html',
  styleUrl: './showcase-card-008.component.scss',
})
export class ShowcaseCard008Component {
  @Input() seed = 53;

  readonly featureIndex = 53;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
