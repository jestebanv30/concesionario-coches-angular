import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PortfolioComponent} from "./pages/portfolio/portfolio.component";
import {PurchaseHistoryComponent} from "./pages/purchase-history/purchase-history.component";

const routes: Routes = [
  {
    path: "",
    component: PortfolioComponent
  },
  {
    path: "historial-compras",
    component: PurchaseHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
