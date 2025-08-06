import 'zone.js/node';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { LayoutShellComponent } from './app/layout/layout-shell.component';

export default function () {
  return bootstrapApplication(LayoutShellComponent, appConfig);
}
