import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map } from 'rxjs';
import { Marca } from '../shared/models/marca';
import { Pagination } from '../shared/models/pagination';
import { ShopParams } from '../shared/models/shopParams';
import { Tipo } from '../shared/models/tipo';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.marcaId !== 0) {
      params = params.append('brandId', shopParams.marcaId.toString())
    }
    if (shopParams.tipoId !== 0) {
      params = params.append('typeId', shopParams.tipoId.toString())
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());



    return this.http.get<Pagination>(this.baseUrl + 'Products', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id:number){
    return this.http.get<Product>(this.baseUrl+'Products/'+id);
  }

  getMarcas() {
    return this.http.get<Marca[]>(this.baseUrl + 'Products/brands');
  }
  getTipos() {
    return this.http.get<Tipo[]>(this.baseUrl + 'Products/types');
  }
}
