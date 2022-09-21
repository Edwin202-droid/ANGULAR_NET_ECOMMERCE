import { v4 as uuidv4 } from 'uuid';

export interface ICarrito{
    id:string;
    items: ICarritoItem[]
}

export interface ICarritoItem{
    id:number;
    productName:string;
    price:number;
    cantidad:number;
    pictureUrl:string;
    marca:string;
    tipo:string;
}

export class Carrito implements ICarrito{
    id = uuidv4();
    items: ICarritoItem[];
    constructor(){
        this.items = []
    }
}

export interface ICarritoTotal{
    envio:number;
    subtotal:number;
    total:number;
}