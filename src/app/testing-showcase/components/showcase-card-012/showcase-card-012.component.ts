import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-012',
  standalone: true,
  templateUrl: './showcase-card-012.component.html',
  styleUrl: './showcase-card-012.component.scss',
})
export class ShowcaseCard012Component {
  @Input() seed = 57;

  readonly featureIndex = 57;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
