import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CarDto } from "../dto/carDto";
import { environment } from "../../../environments/environments.development";
import { CarsPurchaseDto } from "../dto/carPurchaseDto";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private readonly apiUrl: string = environment.apiUrl;

  private numberProducts = new BehaviorSubject(0);
  public readonly getNumberProducts: Observable<any> = this.numberProducts.asObservable();

  constructor(private http: HttpClient) {
    this.setNumberProducts();
  }

  public getAllCars(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(this.apiUrl + "cars");
  }

  public registerCar(newCar: CarDto): Observable<CarDto> {
    return this.http.post<CarDto>(`${this.apiUrl}cars`, newCar);
  }

  // Puedes añadir métodos para obtener coches por precio y marca si lo deseas
  public getCarsByPrice(price: number): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${this.apiUrl}cars/priceLess-${price}`);
  }

  public getCarsByBrand(brand: string): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(`${this.apiUrl}cars?brand=${brand}`);
  }

  public setNumberProducts(): void {
    let count: number = 0;
    const carsPurchaseString = localStorage.getItem("carsPurschase");

    if (!carsPurchaseString) {
      this.numberProducts.next(0);
      return;
    }

    let carsPurchase: Array<CarsPurchaseDto>;
    try {
      carsPurchase = JSON.parse(carsPurchaseString);
    } catch (e) {
      console.error("Error parsing carsPurschase from localStorage", e);
      this.numberProducts.next(0);
      return;
    }

    console.log("esto es nulo", carsPurchase);
    carsPurchase.forEach(car => count += car.quantity);
    this.numberProducts.next(count);
  }
}
