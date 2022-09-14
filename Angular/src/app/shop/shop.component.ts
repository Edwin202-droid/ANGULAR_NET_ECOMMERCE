import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Marca } from '../shared/models/marca';
import { Tipo } from '../shared/models/tipo';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('search',{static:true}) searchTerm !: ElementRef;
  products: Product[]=[];
  marcas:Marca[]=[];
  tipos:Tipo[]=[];
  shopParams = new ShopParams();
  totalCount:number = 0;

  sortOptions = [
    {name:'Alfabetico', value:'name'},
    {name: 'Precio: Menor al Mayor', value:'priceAsc'},
    {name: 'Precio: Mayor al menor', value: 'priceDesc'}
  ]
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getMarcas();
    this.getTipos();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(response =>{
      console.log(response);
      
      this.products = response?.data || []
      this.shopParams.pageNumber = response?.pageIndex || 0;
      this.shopParams.pageSize = response?.pageSize || 0;
      this.totalCount = response?.count || 0
    }, error =>{
      console.log(error);
    });
  }

  getMarcas(){
    this.shopService.getMarcas().subscribe(response =>{
      this.marcas = [{id:0, name: 'Todos'},...response]
    }, error =>{
      console.log(error);
    });
  }

  getTipos(){
    this.shopService.getTipos().subscribe(response =>{
      this.tipos = [{id:0, name: 'Todos'},...response]
    }, error =>{
      console.log(error);
    });
  }

  onMarcaSelected(marcaId:number){
    this.shopParams.marcaId = marcaId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTipoSelected(tipoId:number){
    this.shopParams.tipoId = tipoId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort:any){
    this.shopParams.sort = sort.value;
    this.getProducts();
  }

  onPageChanged(event:any){
    //Evitar lanzamiento dos veces por el output emit
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    this.searchTerm.nativeElement.value = "";
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
