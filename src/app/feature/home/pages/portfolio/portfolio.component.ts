import {Component, NgIterable, OnInit} from '@angular/core';
import {CarService} from "../../../../core/service/car.service";
import {FormsModule} from "@angular/forms";
import {HeaderNavComponent} from "../../components/header-nav/header-nav.component";
import {CommonModule} from "@angular/common";
import {CarDto} from "../../../../core/dto/carDto";
import {PreviewCarComponent} from "../../components/preview-car/preview-car.component";
import {CarsPurchaseDto} from "../../../../core/dto/carsPurchaseDto";
import Swal from "sweetalert2";
import {trigger} from "@angular/animations";
import {convertOutputFile} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderNavComponent,
    PreviewCarComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit{

  public listCarsPortfolio: CarDto[];
  public selectedCar: any = null;
  public carsPurchase: Array<CarsPurchaseDto>;

  constructor(private carService: CarService) {
    this.carsPurchase = [];
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    });
  }

  ngOnInit(): void {
    this.carsPurchase = JSON.parse(localStorage.getItem("carsPurschase")) ? JSON.parse(localStorage.getItem("carsPurschase")): [];
  }

  selectCar(car: any) {
    this.selectedCar = car;
  }

  public addCarShoppingCart(carNew: CarDto): void {
    let added: boolean = false;

    if (this.carsPurchase.length > 0) {
      for (let i = 0; i < this.carsPurchase.length && !added; i++) {
        let car: CarsPurchaseDto = this.carsPurchase[i];
        if (car.codeCar == carNew.codeCar) {
          if ((car.quantity + 1) > carNew.stock) {
            Swal.fire({
              icon: "error",
              title: "Error al agregar",
              text: "No puedes agregar cantidades superiores al stock"
            });
            added = true;
          } else {
            car.quantity += 1;
            car.total += carNew.price;
            added = true;
            //Proceso de reactividad para cantidad stock del carro
            /*this.listCarsPortfolio.forEach(car => {
              if (car.codeCar == carNew.codeCar) {
                car.stock = car.stock - 1
              }

            });*/
          }
        }
      }
    }

    if (!added) {
      let carPurchase: CarsPurchaseDto = {
        codeCar: carNew.codeCar,
        quantity: 1,
        total: carNew.price
      };
      this.carsPurchase.push(carPurchase);
    }
    //Proceso de reactividad para cantidad stock del carro
    /*this.listCarsPortfolio.forEach(car => {
      if (car.codeCar == carNew.codeCar) {
        car.stock = car.stock - 1
      }

    });*/

    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase));
    this.carService.setNumberProducts();
  }

  public deleteCarShoppingCart(carNew: CarDto): void {
    let carActual = this.carsPurchase.find(car => car.codeCar === carNew.codeCar);
    let deleted: boolean = false;

    if (carActual == null) {
      Swal.fire({
        icon: "info",
        title: "Eliminar del carrito",
        text: "No has agregado ninguna unidad de este coche"
      });
    } else {
      for (let i = 0; i < this.carsPurchase.length && !deleted; i++) {
        let car: CarsPurchaseDto = this.carsPurchase[i];
        if (car.codeCar == carNew.codeCar) {
          if (car.quantity - 1 == 0) {
            this.carsPurchase.splice(i, 1);
          } else {
            car.quantity -= 1;
            car.total -= carNew.price;
            deleted = true;
            //Proceso de reactividad para cantidad stock del carro
            /*this.listCarsPortfolio.forEach(car => {
              if (car.codeCar == carNew.codeCar) {
                car.stock = car.stock + 1
              }
            });*/
          }
        }
      }
    }
    localStorage.setItem('carsPurchase', JSON.stringify(this.carsPurchase));
    this.carService.setNumberProducts();
  }
}
