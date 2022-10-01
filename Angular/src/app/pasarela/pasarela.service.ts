import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from "../shared/models/deliveryMethod";
import { Observable } from 'rxjs';
import { IOrderCreate } from '../shared/models/order';
@Injectable({
  providedIn: 'root'
})
export class PasarelaService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getDeliveryMethods():Observable<IDeliveryMethod[]>{
    return this.http.get<IDeliveryMethod[]>(this.baseUrl+'orders/deliveryMetodos').pipe(
      map( (dm:IDeliveryMethod[]) => {
        return dm.sort((a,b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderCreate){
    return this.http.post(this.baseUrl+'orders', order);
  }
}
