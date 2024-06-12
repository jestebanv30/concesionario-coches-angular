import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {CustomValidators} from "../../../../core/utils/CustomValidators";
import {InfoBasicCarComponent} from "../../components/info-basic-car/info-basic-car.component";
import {InfoMechanicCarComponent} from "../../components/info-mechanic-car/info-mechanic-car.component";
import {TokenService} from "../../../../core/service/token.service";
import {BrandCarDto} from "../../../../core/dto/brandCarDto";
import {BrandCarService} from "../../../../core/service/brand-car.service";
import {NgForOf} from "@angular/common";
import {CarDto} from "../../../../core/dto/carDto";
import {lastValueFrom} from "rxjs";
import {CarService} from "../../../../core/service/car.service";
import Swal from "sweetalert2";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";

@Component({
  selector: 'app-register-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InfoBasicCarComponent,
    InfoMechanicCarComponent,
    NgForOf
  ],
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent extends AppBaseComponent implements OnInit{

  public registerCarForm: FormGroup;

  public listCarBrand: BrandCarDto[];

  constructor(private fb: FormBuilder, private carService: CarService, private tokenService: TokenService, private brandCarService: BrandCarService) {
    super();
    this.registerCarForm = this.fb.group({
      carBrandId: ['', Validators.required],
      reference: ['', Validators.required],
      price: ['', Validators.required],
      modelYear: ['', Validators.required], //CustomValidators.numberDateFuture
      category: ['', Validators.required],
      stock: ['', Validators.required], //Validators.pattern("^[0-9]*$")
      horsepower: ['', Validators.required],
      engineDisplacement: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      traction: ['', Validators.required],
      steering: ['', Validators.required],
      color: ['', Validators.required],
      numberDoor: ['', Validators.required],
      numberSeat: ['', Validators.required],
      imagePath: ['', Validators.required],
    })
  }

  public async registerCar(): Promise<void> {

    let dtoRegister: CarDto = this.registerCarForm.value

    if (this.registerCarForm.valid) {
      await lastValueFrom(this.carService.registerCar(dtoRegister));
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Se registró el carro correctamente'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un problem al registrar el carro'
      })
      console.log(this.getAllErrorsForm(this.registerCarForm));
      this.registerCarForm.markAllAsTouched();
      return;
    }
  }

  ngOnInit(): void {
    this.brandCarService.getAllBrandsCar().subscribe({
      next: value => {
        this.listCarBrand = value;
      }
    })
  }
}
  /*constructor(private fb: FormBuilder) {
    this.registerCarForm = this.fb.group({
      infoBasicForm: this.fb.group({
        carBrandId: ['', Validators.required],
        reference: ['', Validators.required],
        price: ['', Validators.required],
        modelYear: ['', Validators.required, CustomValidators.numberDateFuture],
        category: ['', Validators.required],
        stock: ['', Validators.required, Validators.pattern("^[0-9]*$")],
      }),
      infoMechanicForm: this.fb.group({
        horsepower: ['', Validators.required],
        engineDisplacement: ['', Validators.required],
        transmission: ['', Validators.required],
        fuelType: ['', Validators.required],
        traction: ['', Validators.required],
        steering: ['', Validators.required],
      }),
      infoAestheticForm: this.fb.group({
        color: ['', Validators.required],
        numberDoor: ['', Validators.required],
        numberSeat: ['', Validators.required],
        imagePath: ['', Validators.required],
      }),
    })
  }

  // Método para obtener el FormGroup anidado
  get infoBasicFormGroup(): FormGroup {
    return this.registerCarForm.get('infoBasicForm') as FormGroup;
  }

  public async registerCar(): Promise<void> {

  let formData = this.registerCarForm.value;

  let formBasic = formData["infoBasicForm"];
  let formMechanic = formData["infoMechanicForm"];
  let formAesthetic = formData["infoAestheticForm"];

  let dtoRegisterCar: CarDto = {
  ...formBasic,
  ...formMechanic,
  ...formAesthetic
  }
  console.log("este es el dto a enviar", dtoRegisterCar);
  }*/

