import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {NgClass} from "@angular/common";
import {AuthLoginRequestDto} from "../../../../core/dto/authLoginRequestDto";
import {AuthService} from "../../../../core/service/auth.service";
import {lastValueFrom} from "rxjs";
import {TokenService} from "../../../../core/service/token.service";
import {ErrorsForm} from "../../../../core/enums/ErrorsForm";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends AppBaseComponent{

  /*
  Formulario reactivo de login
   */

  public loginForm: FormGroup;

  /*
  Colocar las validaciones de la documentacion de los requisitos funcionales
   */
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
    super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public async signIn(): Promise<void> {

    let dtoLogin: AuthLoginRequestDto;

    if(this.loginForm.valid){
      alert('Todo correcto');
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      dtoLogin = {
        "email": email,
        password,
      }

      await lastValueFrom(this.authService.signIn(dtoLogin));

      console.log(this.tokenService.getToken());

      await this.router.navigateByUrl('/portafolio');

      console.log('Se va a mostrar antes que el subscribe');

    }else {
      alert("Hay errores en el formulario");
      //console.log(this.getAllErrors(this.loginForm));
      this.loginForm.markAllAsTouched();
    }

}

  /*
  public signUp(): void {
    this.router.navigateByUrl("autenticacion/registro"); // Navegacion mediante la clase Router
  }
   */

  /**
   * Retorna un mensaje de error en el campo del formulario
   * @param field
   */
  public getErrorFrom(field: string): string {
    let message;

    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field).hasError('required')) {
        message = ErrorsForm.REQUIRED;
      } else if (this.loginForm.get(field).hasError('email')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }
    }

    return message;
  }

}
