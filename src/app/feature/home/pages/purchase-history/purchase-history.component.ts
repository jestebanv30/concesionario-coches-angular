import { Component } from '@angular/core';
import {PurchaseService} from "../../../../core/service/purchase.service";
import {TokenService} from "../../../../core/service/token.service";
import {CommonModule, CurrencyPipe, DatePipe} from "@angular/common";
import {CarsPurchaseDto} from "../../../../core/dto/carsPurchaseDto";

@Component({
  selector: 'app-purchase-history',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {

  public historyPurchases: Array<any>;

  public carsPurchases: Array<CarsPurchaseDto>;

  //Crear un DTO para mapera el historial de compras
  constructor(private purchaseService: PurchaseService, private tokenService: TokenService) {
    this.purchaseService.getAllPurchaseByIdCustomer(this.tokenService.getInfoToken().cardId).subscribe({
      next: value => {
        this.historyPurchases = value;
        console.log('Historial de compras:');
        console.log(this.historyPurchases);
      }
    });
  }

  public showListCarsPurchase(carsPurchase: Array<CarsPurchaseDto>): void {
    this.carsPurchases = carsPurchase;
    console.log('Carros comprados:');
    console.log(this.carsPurchases);
  }
}
