import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/service/auth.service";
import {TokenService} from "../../../../core/service/token.service";
import {AuthLoginRequestDto} from "../../../../core/dto/authLoginRequestDto";
import {lastValueFrom} from "rxjs";
import {RegisterRequestDto} from "../../../../core/dto/RegisterRequestDto";
import {CustomValidators} from "../../../../core/utils/CustomValidators";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AppBaseComponent {

  /*
  Formulario reactivo de login
   */

  public registerForm: FormGroup;

  public passwordGenerate: string;

  public registered: boolean;

  /*
  Colocar las validaciones de la documentacion de los requisitos funcionales
   */
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    super();
    this.registered = false;
    this.registerForm = this.fb.group({
      cardId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
        + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
      numberCellphone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    })
  }

  public async register(): Promise<void> {

    let dtoRegister: RegisterRequestDto = this.registerForm.value;

    if(this.registerForm.valid){
      await lastValueFrom(this.authService.register(dtoRegister)).then(resp => {
        this.passwordGenerate = resp.password;
      })
      this.registered = true;
    }else {
      alert('Errores en el formulario');
      console.log(this.getAllErrorsForm(this.registerForm));
    }
  }

  /**
   * Retorna un mensaje de error en el campo del formulario
   * @param field
   */
  public getErrorFrom(field: string): string {
    let message;

    const required: Array<String> = ["cardId", "fullName", "email", "numberCellphone"];
    const formatEmail: Array<String> = ["email"];
    const onlyNumber: Array<String> = ["numberCellphone", "cardId"];

    if (this.isTouchedField(this.registerForm, field)) {

      if (required.includes(field) && this.registerForm.get(field).hasError('required')) {
        message = ErrorsForm.REQUIRED;
      }else if (onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_NUMBERS;
      }else if (formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }
}
