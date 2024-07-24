import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "autenticacion/inicio-sesion",
    pathMatch: "full",
  },
  {
    path: "",
    loadChildren: () => import("./feature/feature.module").then(f => f.FeatureModule)
  }
];
