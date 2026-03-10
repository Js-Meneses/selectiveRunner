export interface SyntheticCase {
  caseId: number;
  expectedLabel: string;
  expectedScore: number;
  seed: number;
}

const DEFAULT_DELAY_MS = 25;
const DEFAULT_CASES_PER_SPEC = 15;

export function getSyntheticDelayMs(): number {
  const parsed = Number(process.env['SLOW_TEST_DELAY_MS'] ?? DEFAULT_DELAY_MS);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_DELAY_MS;
}

export async function waitForSyntheticDelay(): Promise<void> {
  const delay = getSyntheticDelayMs();

  if (delay === 0) {
    return;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function getCasesPerSpec(): number {
  const parsed = Number(process.env['SLOW_TEST_CASES'] ?? DEFAULT_CASES_PER_SPEC);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CASES_PER_SPEC;
}

export function calculateSyntheticScore(featureIndex: number, seed: number): number {
  const base = featureIndex * 17;
  return base + seed * 11 + (featureIndex % 7) * 5;
}

export function buildSyntheticLabel(featureIndex: number, seed: number): string {
  return `feature-${featureIndex.toString().padStart(3, '0')}-seed-${seed}`;
}

export function buildSyntheticCases(featureIndex: number): SyntheticCase[] {
  return Array.from({ length: getCasesPerSpec() }, (_, index) => {
    const seed = featureIndex + index + 1;

    return {
      caseId: index + 1,
      expectedLabel: buildSyntheticLabel(featureIndex, seed),
      expectedScore: calculateSyntheticScore(featureIndex, seed),
      seed,
    };
  });
}
