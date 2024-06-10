import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppBaseComponent} from "../../../../core/utils/AppBaseComponent";
import {NgClass} from "@angular/common";
import {AuthLoginRequestDto} from "../../../../core/dto/authLoginRequestDto";
import {AuthService} from "../../../../core/service/auth.service";

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
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    super();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public signIn(): void {

    let dtoLogin: AuthLoginRequestDto;

    if(this.loginForm.valid){
      alert('Todo correcto');
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      dtoLogin = {
        "email": email,
        password,
      }

      this.authService.signIn(dtoLogin);

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

  public getErrorFrom(field: string): string {
    let message;

    if (this.isTouchedField(this.loginForm, field)) {
      if (this.loginForm.get(field).hasError('required')) {
        message = " El campo es requerido";
      } else if (this.loginForm.get(field).hasError('email')) {
        message = " Requiere el formato de email";
      }
    }

    return message;
  }

}
