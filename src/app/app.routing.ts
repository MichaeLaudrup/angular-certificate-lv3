import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignementJustificationComponent } from './modules/assignement-justification/assignementJustification/assignement-justification.component';

const appRoutes: Routes = [
  {
    path: 'weather-app',
    loadChildren: () =>  import('./modules/wheather/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'justifications',
    component: AssignementJustificationComponent
  },
  {
    path: '**', redirectTo: 'weather-app'
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {});
