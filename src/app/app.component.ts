import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { showcaseMetadata } from './testing-showcase/generated/showcase-metadata';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = 'Angular 17 + Jest selective runner';
  protected readonly showcase = showcaseMetadata;
  protected readonly ciScenarios = [
    {
      environment: 'dev',
      command: 'npm run test:ci:dev -- --base=origin/develop --head=HEAD',
      behavior: 'Corre solo specs relacionados con archivos modificados.'
    },
    {
      environment: 'stg',
      command: 'npm run test:ci:stg -- --base=origin/staging --head=HEAD',
      behavior: 'Repite la estrategia selectiva para ramas de validacion.'
    },
    {
      environment: 'prod',
      command: 'npm run test:ci:prod',
      behavior: 'Ejecuta toda la suite con cobertura para metricas globales.'
    }
  ];
  protected readonly quickCommands = [
    'npm run test',
    'npm run test:changed -- --base=HEAD~1 --head=HEAD',
    'npm run test:demo:all',
    'npm run test:demo:changed -- --base=HEAD~1 --head=HEAD'
  ];
}
