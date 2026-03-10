import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const serviceCount = 45;
const componentCount = 15;
const testsPerSpec = 15;
const testingShowcaseRoot = path.join(workspaceRoot, 'src/app/testing-showcase');
const servicesRoot = path.join(testingShowcaseRoot, 'services');
const componentsRoot = path.join(testingShowcaseRoot, 'components');
const metadataFile = path.join(testingShowcaseRoot, 'generated/showcase-metadata.ts');

mkdirSync(servicesRoot, { recursive: true });
mkdirSync(componentsRoot, { recursive: true });
mkdirSync(path.dirname(metadataFile), { recursive: true });

for (let index = 1; index <= serviceCount; index += 1) {
  const suffix = index.toString().padStart(3, '0');
  const className = `ShowcaseFeature${suffix}Service`;
  const baseName = `showcase-feature-${suffix}`;
  const folder = path.join(servicesRoot, baseName);

  mkdirSync(folder, { recursive: true });

  writeFileSync(
    path.join(folder, `${baseName}.service.ts`),
    `import { Injectable } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Injectable({ providedIn: 'root' })
export class ${className} {
  readonly featureIndex = ${index};

  score(seed: number): number {
    return calculateSyntheticScore(this.featureIndex, seed);
  }

  label(seed: number): string {
    return buildSyntheticLabel(this.featureIndex, seed);
  }
}
`,
  );

  writeFileSync(
    path.join(folder, `${baseName}.service.spec.ts`),
    `import { TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ${className} } from './${baseName}.service';

describe('${className}', () => {
  let service: ${className};

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(${className});
  });

  it.each(buildSyntheticCases(${index}))(
    'resuelve el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      expect(service.score(seed)).toBe(expectedScore);
      expect(service.label(seed)).toBe(expectedLabel);
    },
  );
});
`,
  );
}

for (let index = 1; index <= componentCount; index += 1) {
  const featureIndex = serviceCount + index;
  const suffix = index.toString().padStart(3, '0');
  const className = `ShowcaseCard${suffix}Component`;
  const selector = `app-showcase-card-${suffix}`;
  const baseName = `showcase-card-${suffix}`;
  const folder = path.join(componentsRoot, baseName);

  mkdirSync(folder, { recursive: true });

  writeFileSync(
    path.join(folder, `${baseName}.component.ts`),
    `import { Component, Input } from '@angular/core';

import { buildSyntheticLabel, calculateSyntheticScore } from '../../../../testing/slow-test-helpers';

@Component({
  selector: '${selector}',
  standalone: true,
  templateUrl: './${baseName}.component.html',
  styleUrl: './${baseName}.component.scss',
})
export class ${className} {
  @Input() seed = ${featureIndex};

  readonly featureIndex = ${featureIndex};

  get score(): number {
    return calculateSyntheticScore(this.featureIndex, this.seed);
  }

  get label(): string {
    return buildSyntheticLabel(this.featureIndex, this.seed);
  }
}
`,
  );

  writeFileSync(
    path.join(folder, `${baseName}.component.html`),
    `<article class="card">
  <p class="eyebrow">Synthetic component ${suffix}</p>
  <h3>{{ label }}</h3>
  <strong>{{ score }}</strong>
</article>
`,
  );

  writeFileSync(
    path.join(folder, `${baseName}.component.scss`),
    `.card {
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(20, 33, 61, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(240, 229, 216, 0.72));
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  font-size: 0.74rem;
  letter-spacing: 0.12em;
}

h3,
strong {
  margin: 0;
}
`,
  );

  writeFileSync(
    path.join(folder, `${baseName}.component.spec.ts`),
    `import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  buildSyntheticCases,
  waitForSyntheticDelay,
} from '../../../../testing/slow-test-helpers';
import { ${className} } from './${baseName}.component';

describe('${className}', () => {
  let component: ${className};
  let fixture: ComponentFixture<${className}>;

  beforeAll(async () => {
    await waitForSyntheticDelay();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [${className}],
    }).compileComponents();

    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
  });

  it.each(buildSyntheticCases(${featureIndex}))(
    'renderiza el caso %#',
    ({ expectedLabel, expectedScore, seed }) => {
      component.seed = seed;
      fixture.detectChanges();

      expect(component.label).toBe(expectedLabel);
      expect(component.score).toBe(expectedScore);
      expect(fixture.nativeElement.textContent).toContain(expectedLabel);
      expect(fixture.nativeElement.textContent).toContain(String(expectedScore));
    },
  );
});
`,
  );
}

writeFileSync(
  metadataFile,
  `export const showcaseMetadata = {
  componentCount: ${componentCount},
  serviceCount: ${serviceCount},
  specFiles: ${serviceCount + componentCount},
  testsPerSpec: ${testsPerSpec},
  totalTests: ${(serviceCount + componentCount) * testsPerSpec},
} as const;
`,
);
