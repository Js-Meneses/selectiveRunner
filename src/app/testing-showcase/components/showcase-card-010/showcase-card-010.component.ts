import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-010',
  standalone: true,
  templateUrl: './showcase-card-010.component.html',
  styleUrl: './showcase-card-010.component.scss',
})
export class ShowcaseCard010Component {
  @Input() seed = 55;

  readonly featureIndex = 55;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
