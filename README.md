# Angular 17 + Jest selective runner

Proyecto de muestra para simular un frontend Angular con una suite grande de Jest y probar una estrategia de pipeline donde:

- `dev` y `stg` corren solo los tests relacionados con archivos modificados.
- `prod` corre toda la suite con cobertura.

## Que trae el demo

- Angular 17 standalone.
- Jest configurado con `jest-preset-angular`.
- 60 specs sinteticos:
  - 45 servicios.
  - 15 componentes con `html` y `scss`.
- 900 tests en total.
- Espera sintetica configurable por spec con `SLOW_TEST_DELAY_MS`.
- Workflow de ejemplo en [`.github/workflows/selective-tests.yml`](/Users/jsmen/Documents/Proyectos/Tests/.github/workflows/selective-tests.yml).

## Comandos principales

```bash
npm install
npm start
npm run test
npm run test:all
npm run test:changed -- --base=HEAD --head=WORKTREE
```

## Modos de prueba

`npm run test`

- Corre Jest con la demora sintetica corta por defecto.

`npm run test:changed -- --base=<ref> --head=<ref>`

- Usa `git diff` para detectar archivos modificados.
- Si cambias un `.ts`, intenta correr su spec hermano y tambien lo que detecte `jest --findRelatedTests`.
- Si cambias un `.html` o `.scss`, fuerza la inclusion del `.ts` y `.spec.ts` hermano.
- Si cambias archivos globales como `package.json` o `jest.config.js`, hace fallback a la suite completa.

`npm run test:demo:all`

- Ejecuta toda la suite con `SLOW_TEST_DELAY_MS=10000`.

`npm run test:demo:changed -- --base=HEAD --head=WORKTREE`

- Ejecuta solo lo afectado, tambien con demora sintetica de 10 segundos por spec.

## Ambientes de CI

`npm run test:ci:dev -- --base=<sha-base> --head=<sha-head>`

- Estrategia selectiva para ramas o PRs de desarrollo.

`npm run test:ci:stg -- --base=<sha-base> --head=<sha-head>`

- Misma estrategia selectiva, pensada para staging.

`npm run test:ci:prod`

- Corre toda la suite y activa cobertura.

## Prueba local sugerida

1. Inicializa git si aun no existe historial.
2. Haz un commit base.
3. Modifica por ejemplo [`src/app/testing-showcase/services/showcase-feature-001/showcase-feature-001.service.ts`](/Users/jsmen/Documents/Proyectos/Tests/src/app/testing-showcase/services/showcase-feature-001/showcase-feature-001.service.ts).
4. Ejecuta:

```bash
npm run test:demo:changed -- --base=HEAD --head=WORKTREE
```

Deberias ver que se ejecuta solo el spec relacionado con ese cambio, en lugar de recorrer toda la suite pesada.

## GitHub Actions

El workflow de ejemplo:

- corre selectivo para PRs hacia `develop` y `staging`
- corre toda la suite para PRs o pushes hacia `main`
- usa `fetch-depth: 0` para que `git diff` tenga historial suficiente

Si en tu repo los nombres de ramas son distintos, solo ajusta el archivo [`.github/workflows/selective-tests.yml`](/Users/jsmen/Documents/Proyectos/Tests/.github/workflows/selective-tests.yml).

## Archivos clave

- [`jest.config.js`](/Users/jsmen/Documents/Proyectos/Tests/jest.config.js)
- [`setup-jest.ts`](/Users/jsmen/Documents/Proyectos/Tests/setup-jest.ts)
- [`scripts/run-changed-tests.mjs`](/Users/jsmen/Documents/Proyectos/Tests/scripts/run-changed-tests.mjs)
- [`scripts/run-tests-for-env.mjs`](/Users/jsmen/Documents/Proyectos/Tests/scripts/run-tests-for-env.mjs)
- [`scripts/generate-slow-suite.mjs`](/Users/jsmen/Documents/Proyectos/Tests/scripts/generate-slow-suite.mjs)
- [`src/testing/slow-test-helpers.ts`](/Users/jsmen/Documents/Proyectos/Tests/src/testing/slow-test-helpers.ts)
