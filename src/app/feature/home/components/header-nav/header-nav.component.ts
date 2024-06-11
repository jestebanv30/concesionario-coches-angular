import { Component } from '@angular/core';
import {TokenService} from "../../../../core/service/token.service";

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.css'
})
export class HeaderNavComponent {

  public nameCustomer: string;
  public emailCustomer: string;

  constructor(private tokenService: TokenService) {
    this.nameCustomer = this.tokenService.getInfoToken().fullName;
    this.emailCustomer = this.tokenService.getInfoToken().email;
  }

}
