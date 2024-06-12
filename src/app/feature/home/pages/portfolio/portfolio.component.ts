import {Component, NgIterable} from '@angular/core';
import {CarService} from "../../../../core/service/car.service";
import {FormsModule} from "@angular/forms";
import {HeaderNavComponent} from "../../components/header-nav/header-nav.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HeaderNavComponent
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

  public listCarsPortfolio: any[];

  constructor(private carService: CarService ) {
    this.carService.getAllCars().subscribe({
      next: value => {
        this.listCarsPortfolio = value;
      }
    })
  }

  onCarClick(car: any) {

  }
}
