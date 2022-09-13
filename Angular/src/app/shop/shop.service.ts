import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { Marca } from '../shared/models/marca';
import { Pagination } from '../shared/models/pagination';
import { Tipo } from '../shared/models/tipo';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http:HttpClient) { }

  getProducts(marcaId?:number, tipoId?:number, sort?:string){
    let params = new HttpParams();
    if(marcaId){
      params = params.append('brandId',marcaId.toString())
    }
    if(tipoId){
      params = params.append('typeId',tipoId.toString())
    }

    if(sort){
      params = params.append('sort',sort);
    }

    return this.http.get<Pagination>(this.baseUrl+'Products', {observe:'response', params})
      .pipe(
        map(response =>{
          return response.body;
        })
      );
  }

  getMarcas(){
    return this.http.get<Marca[]>(this.baseUrl+'Products/brands');
  }
  getTipos(){
    return this.http.get<Tipo[]>(this.baseUrl+'Products/types');
  }
}
