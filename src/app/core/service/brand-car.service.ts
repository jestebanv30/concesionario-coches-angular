import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandCarDto} from "../dto/brandCarDto";
import {environment} from "../../../environments/environments.development";

@Injectable({
  providedIn: 'root'
})
export class BrandCarService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getAllBrandsCar(): Observable<BrandCarDto[]>{
    return this.http.get<BrandCarDto[]>(this.apiUrl + "car-brands");
  }
}
