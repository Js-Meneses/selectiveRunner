import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-014',
  standalone: true,
  templateUrl: './showcase-card-014.component.html',
  styleUrl: './showcase-card-014.component.scss',
})
export class ShowcaseCard014Component {
  @Input() seed = 59;

  readonly featureIndex = 59;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
