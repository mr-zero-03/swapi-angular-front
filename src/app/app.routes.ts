import { Routes } from '@angular/router';
import { PlanetasComponent } from './pages/planetas/planetas.component';
import { ResidentesComponent } from './pages/residentes/residentes.component';
import { VehiculosComponent } from './pages/vehiculos/vehiculos.component';

export const routes: Routes = [
  { path: '', redirectTo: '/planetas', pathMatch: 'full' },
  { path: 'planetas', component: PlanetasComponent },
  { path: 'residentes', component: ResidentesComponent },
  { path: 'vehiculos', component: VehiculosComponent },
];
