import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-015',
  standalone: true,
  templateUrl: './showcase-card-015.component.html',
  styleUrl: './showcase-card-015.component.scss',
})
export class ShowcaseCard015Component {
  @Input() seed = 60;

  readonly featureIndex = 60;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
