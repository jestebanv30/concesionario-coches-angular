import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../service/token.service";

export const authWithoutGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);


  if(!tokenService.getToken()) {
    alert('No tienes permisos');
    router.navigateByUrl('autenticacion/inicio-sesion');
    return false;
  }
  return true;
};
