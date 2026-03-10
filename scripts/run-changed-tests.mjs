import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const baseArg = readArgValue('--base', args) ?? process.env.TEST_BASE_REF ?? 'origin/main';
const headArg = readArgValue('--head', args) ?? process.env.TEST_HEAD_REF ?? 'HEAD';
const jestArgs = args.filter((arg) => !arg.startsWith('--base=') && !arg.startsWith('--head='));

const workspaceRoot = process.cwd();
const changedFiles = getChangedFiles(baseArg, headArg);

if (!changedFiles.length) {
  console.log(`No se detectaron cambios entre ${baseArg} y ${headArg}.`);
  process.exit(0);
}

const shouldRunAll = changedFiles.some((file) =>
  [
    'package.json',
    'package-lock.json',
    'jest.config.js',
    'setup-jest.ts',
    'tsconfig.spec.json',
    'angular.json',
  ].includes(file),
);

if (shouldRunAll) {
  console.log('Se tocaron archivos globales de testing. Se ejecutara la suite completa.');
  runJest([], jestArgs);
}

const directSpecPaths = new Set();
const relatedSourcePaths = new Set();

for (const file of changedFiles) {
  const normalizedFile = file.replace(/\\/g, '/');

  if (!normalizedFile.startsWith('src/')) {
    continue;
  }

  if (normalizedFile.endsWith('.spec.ts')) {
    directSpecPaths.add(path.join(workspaceRoot, normalizedFile));
    continue;
  }

  if (normalizedFile.endsWith('.html') || normalizedFile.endsWith('.scss')) {
    const siblingTs = normalizedFile.replace(/\.(html|scss)$/u, '.ts');
    const siblingSpec = normalizedFile.replace(/\.(html|scss)$/u, '.spec.ts');

    pushIfExists(relatedSourcePaths, path.join(workspaceRoot, siblingTs));
    pushIfExists(directSpecPaths, path.join(workspaceRoot, siblingSpec));
    continue;
  }

  if (normalizedFile.endsWith('.ts')) {
    pushIfExists(relatedSourcePaths, path.join(workspaceRoot, normalizedFile));
    pushIfExists(
      directSpecPaths,
      path.join(workspaceRoot, normalizedFile.replace(/\.ts$/u, '.spec.ts')),
    );
  }
}

const relatedTests = listRelatedTests([...relatedSourcePaths], jestArgs);
const finalTestPaths = [...new Set([...directSpecPaths, ...relatedTests])];

if (!finalTestPaths.length) {
  console.log('No hubo specs relacionados con los cambios detectados.');
  process.exit(0);
}

console.log(`Se ejecutaran ${finalTestPaths.length} archivo(s) de test relacionados.`);
runJest(['--runTestsByPath', ...finalTestPaths], jestArgs);

function getChangedFiles(base, head) {
  const diffArgs =
    head === 'WORKTREE' || head === 'UNCOMMITTED'
      ? ['diff', '--name-only', '--diff-filter=ACMR', base]
      : ['diff', '--name-only', '--diff-filter=ACMR', `${base}...${head}`];

  let diffOutput = '';

  try {
    diffOutput = execFileSync('git', diffArgs, {
      cwd: workspaceRoot,
      encoding: 'utf8',
    });
  } catch (error) {
    console.error(
      `No fue posible calcular el diff con git usando base=${base} y head=${head}. ` +
        'Verifica que exista un repositorio git y que las refs sean validas.',
    );
    process.exit(1);
  }

  return diffOutput
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function readArgValue(prefix, inputArgs) {
  const inlineArg = inputArgs.find((arg) => arg.startsWith(`${prefix}=`));
  return inlineArg ? inlineArg.slice(prefix.length + 1) : undefined;
}

function pushIfExists(collection, filePath) {
  if (existsSync(filePath)) {
    collection.add(filePath);
  }
}

function listRelatedTests(sourcePaths, extraArgs) {
  if (!sourcePaths.length) {
    return [];
  }

  const result = spawnSync(
    process.execPath,
    [
      path.join(workspaceRoot, 'node_modules/jest/bin/jest.js'),
      '--config',
      path.join(workspaceRoot, 'jest.config.js'),
      '--findRelatedTests',
      '--listTests',
      ...sourcePaths,
      ...extraArgs,
    ],
    {
      cwd: workspaceRoot,
      encoding: 'utf8',
      env: process.env,
    },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }

  return result.stdout
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter(Boolean);
}

function runJest(targetArgs, extraArgs) {
  const result = spawnSync(
    process.execPath,
    [
      path.join(workspaceRoot, 'node_modules/jest/bin/jest.js'),
      '--config',
      path.join(workspaceRoot, 'jest.config.js'),
      ...targetArgs,
      ...extraArgs,
    ],
    {
      cwd: workspaceRoot,
      stdio: 'inherit',
      env: process.env,
    },
  );

  process.exit(result.status ?? 1);
}
