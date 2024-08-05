import {Injectable} from '@angular/core';
import {AuthLoginRequestDto} from "../dto/authLoginRequestDto";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments.development";
import {AuthLoginResponseDto} from "../dto/authLoginResponseDto";
import {TokenService} from "./token.service";
import {RegisterRequestDto} from "../dto/RegisterRequestDto";
import {RegisterResponseDto} from "../dto/RegisterResponseDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  public signIn(authDto: AuthLoginRequestDto): Observable<AuthLoginResponseDto> {
     return this.http.post<AuthLoginResponseDto>(this.apiUrl + "auth/sign-in", authDto).pipe(
       tap(response => {
         this.tokenService.saveToken(response.token);
       })
     );
   }

  public register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    return this.http.post<RegisterResponseDto>(this.apiUrl + "auth/register", registerDto);
  }
}
