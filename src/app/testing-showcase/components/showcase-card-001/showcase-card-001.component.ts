import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: 'app-showcase-card-001',
  standalone: true,
  templateUrl: './showcase-card-001.component.html',
  styleUrl: './showcase-card-001.component.scss',
})
export class ShowcaseCard001Component {
  @Input() seed = 46;

  readonly featureIndex = 46;

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
