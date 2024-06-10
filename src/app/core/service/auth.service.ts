import {Injectable} from '@angular/core';
import {AuthLoginRequestDto} from "../dto/authLoginRequestDto";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments.development";
import {AuthLoginResponseDto} from "../dto/authLoginResponseDto";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public signIn(authDto: AuthLoginRequestDto): void {
     console.log(`Token ${this.tokenService}`);
     this.http.post<AuthLoginResponseDto>(this.apiUrl + "auth/sign-in", authDto).subscribe({
       next: value => {
         this.tokenService.saveToken(value.token);
       }
     });
   }
}
