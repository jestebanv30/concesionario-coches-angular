import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {CarDto} from "../../../../core/dto/carDto";
import {CarsPurchaseDto} from "../../../../core/dto/carsPurchaseDto";
import Swal from "sweetalert2";

@Component({
  selector: 'app-preview-car',
  standalone: true,
  imports: [
    NgClass,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './preview-car.component.html',
  styleUrl: './preview-car.component.css'
})
export class PreviewCarComponent {
  @Input() car: CarDto | null = null;

  closePreview() {
    this.car = null; // Esto puede variar según cómo manejes el cierre del componente
  }
}
