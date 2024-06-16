import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {CarDto} from "../../../../core/dto/carDto";
import {CarsPurchaseDto} from "../../../../core/dto/carsPurchaseDto";
import {PurchaseRequestDto} from "../../../../core/dto/purchaseRequestDto";
import {TokenService} from "../../../../core/service/token.service";
import {PurchaseService} from "../../../../core/service/purchase.service";
import {BehaviorSubject} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

  public numberBill: string;
  public purchaseSaved: boolean = false;

  private carsPurchaseSubject: BehaviorSubject<CarsPurchaseDto[]> = new BehaviorSubject<CarsPurchaseDto[]>([]);
  public carsPurchase$ = this.carsPurchaseSubject.asObservable();

  public carDetails: { [key: number]: CarDto } = {};

  constructor(private tokenService: TokenService, private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadCart();
    this.carsPurchase$.subscribe(cars => {
      this.carsPurchaseSubject.next(cars);
      cars.forEach(car => {
        this.carDetails[car.codeCar] = this.loadCarDetails(car.codeCar);
      });
    });
  }

  loadCart() {
    const cars = JSON.parse(localStorage.getItem('carsPurchase') || '[]');
    this.carsPurchaseSubject.next(cars);
  }

  loadCarDetails(codeCar: number): CarDto {
    return JSON.parse(localStorage.getItem('carDetails') || '{}')[codeCar] || {};
  }

  removeFromCart(codeCar: number) {
    const currentCars = this.carsPurchaseSubject.value;
    const index = currentCars.findIndex(c => c.codeCar === codeCar);
    if (index > -1) {
      if (currentCars[index].quantity > 1) {
        currentCars[index].quantity -= 1;
        currentCars[index].total -= this.carDetails[codeCar].price;
      } else {
        currentCars.splice(index, 1);
      }
      this.updateLocalStorage(currentCars);
    }
  }

  updateLocalStorage(cars: CarsPurchaseDto[]) {
    localStorage.setItem('carsPurchase', JSON.stringify(cars));
    this.carsPurchaseSubject.next(cars);
  }

  registerPurchase(): void {
    const currentCars = this.carsPurchaseSubject.value;
    let totalItems: number = 0;

    currentCars.forEach(car => totalItems += car.total);

    let newPurchase: PurchaseRequestDto = {
      cardIdCustomer: this.tokenService.getInfoToken().cardId,
      date: new Date(),
      carsPurchase: currentCars,
      paymentMethod: "Efectivo",
      total: totalItems
    };

    this.purchaseService.registerPurchase(newPurchase).subscribe({
      next: value => {
        this.numberBill = value.numberBill;
        this.purchaseSaved = true;
        localStorage.setItem("carsPurchase", JSON.stringify([]));
        this.carsPurchaseSubject.next([]);
      }
    });
  }

  @Output() close = new EventEmitter<void>();

  closeCart() {
    this.close.emit();
  }
}
