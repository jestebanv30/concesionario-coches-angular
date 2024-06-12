import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import Swal from "sweetalert2";
import {TokenService} from "../service/token.service";
import {Roles} from "../enums/Roles";

export const withRolAdminGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);

  if(tokenService.getInfoToken().rol != Roles.ADMIN) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos para acceder a esta página'
    });
    router.navigateByUrl('autenticacion/inicio-sesion');
    return false;
  }
  return true;
};
