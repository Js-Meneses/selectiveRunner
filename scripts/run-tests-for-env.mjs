import { spawnSync } from 'node:child_process';
import path from 'node:path';

const supportedEnvironments = new Set(['all', 'dev', 'stg', 'prod']);
const requestedEnvironment = process.argv[2] ?? 'dev';
const passthroughArgs = process.argv.slice(3);

if (!supportedEnvironments.has(requestedEnvironment)) {
  console.error(`Ambiente no soportado: ${requestedEnvironment}`);
  process.exit(1);
}

const workspaceRoot = process.cwd();
// En CI usar 0 ms para evitar timeout de Jest (5s por defecto). Local/demo usa 10s.
const defaultDelay = process.env.CI === 'true' ? '0' : '10000';
const env = {
  ...process.env,
  SLOW_TEST_DELAY_MS: process.env.SLOW_TEST_DELAY_MS ?? defaultDelay,
  JEST_MAX_WORKERS: process.env.JEST_MAX_WORKERS ?? '50%',
};

if (requestedEnvironment === 'prod' || requestedEnvironment === 'all') {
  const fullRunArgs = [
    path.join(workspaceRoot, 'node_modules/jest/bin/jest.js'),
    '--config',
    path.join(workspaceRoot, 'jest.config.js'),
    '--coverage',
    ...passthroughArgs,
  ];

  const result = spawnSync(process.execPath, fullRunArgs, {
    cwd: workspaceRoot,
    stdio: 'inherit',
    env,
  });

  process.exit(result.status ?? 1);
}

const changedRunArgs = [path.join(workspaceRoot, 'scripts/run-changed-tests.mjs'), ...passthroughArgs];
const result = spawnSync(process.execPath, changedRunArgs, {
  cwd: workspaceRoot,
  stdio: 'inherit',
  env,
});

process.exit(result.status ?? 1);
