import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-003',
  standalone: true,
  templateUrl: './showcase-card-003.component.html',
  styleUrl: './showcase-card-003.component.scss',
})
export class ShowcaseCard003Component {
  @Input() seed = 48;

  readonly featureIndex = 48;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
