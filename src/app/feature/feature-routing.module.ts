import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authWithGuard} from "../core/guards/auth-with.guard";
import {authWithoutGuard} from "../core/guards/auth-without.guard";

const routes: Routes = [
  {
    path: "autenticacion",
    canActivate: [authWithGuard],
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: "portafolio",
    canActivate: [authWithoutGuard],
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
