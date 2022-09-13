import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { Marca } from '../shared/models/marca';
import { Tipo } from '../shared/models/tipo';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: Product[]=[];
  marcas:Marca[]=[];
  tipos:Tipo[]=[];

  marcaSeleccionadaId:number=0;
  tipoSeleccionadaId:number=0
  sortSeleccionada = 'name';
  sortOptions = [
    {name:'Alfabetico', value:'name'},
    {name: 'Precio: Menor al Mayor', value:'priceAsc'},
    {name: 'Precio: Mayor al menor', value: 'priceDesc'}
  ]
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getTipos();
    this.getProducts();
  }

  getProducts(){
    this.shopService.getProducts(this.marcaSeleccionadaId, this.tipoSeleccionadaId, this.sortSeleccionada).subscribe(response =>{
      this.products = response?.data || []
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
    this.marcaSeleccionadaId = marcaId;
    this.getProducts();
  }

  onTipoSelected(tipoId:number){
    this.tipoSeleccionadaId = tipoId;
    this.getProducts();
  }

  onSortSelected(sort:any){
    this.sortSeleccionada = sort.value;
    this.getProducts();
  }

}
