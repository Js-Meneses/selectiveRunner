import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-002',
  standalone: true,
  templateUrl: './showcase-card-002.component.html',
  styleUrl: './showcase-card-002.component.scss',
})
export class ShowcaseCard002Component {
  @Input() seed = 47;

  readonly featureIndex = 47;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
