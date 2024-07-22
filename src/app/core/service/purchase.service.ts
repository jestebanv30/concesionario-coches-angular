import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments.development";
import {HttpClient} from "@angular/common/http";
import {PurchaseRequestDto} from "../dto/purchaseRequestDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public registerPurchase(newPurchase: PurchaseRequestDto): Observable<any>{
    return this.http.post(this.apiUrl + "purchases", newPurchase);
  }

  public getAllPurchaseByIdCustomer(idCustomer: string): Observable<any>{
    return this.http.get(this.apiUrl + "purchases/customers/" + idCustomer);
  }
}
