import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../service/token.service";
import {inject} from "@angular/core";


export const authWithGuard: CanActivateFn = (route, state ) => {

  const tokenService = inject(TokenService);
  const router = inject(Router);


  if(tokenService.getToken()) {
    router.navigateByUrl('portafolio');
    return false;
  }
  return true;
};
