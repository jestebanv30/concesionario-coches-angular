import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {CarService} from "../../../../core/service/car.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ShoppingCartComponent
  ],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css'
})
export class HeaderNavComponent {

  public nameCustomer: string;
  public emailCustomer: string;
  public showCart: boolean = false; // Estado de mostrar/ocultar el carrito
  public numberProducts: number = 0;
  public subscriptionNumber: Subscription;

  constructor(private tokenService: TokenService, private carService: CarService) {
    this.nameCustomer = this.tokenService.getInfoToken().fullName;
    this.emailCustomer = this.tokenService.getInfoToken().email;

    this.subscriptionNumber = this.carService.getNumberProducts.subscribe({
      next: value => this.numberProducts = value
    })
  }



  toggleCart() {
    this.showCart = !this.showCart;
  }
}
