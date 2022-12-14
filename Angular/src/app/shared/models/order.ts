import { IAddress } from './address';
export interface IOrderCreate{
    carritoId:string;
    deliveryMethodId:number;
    shipToAddress: IAddress
}

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: Date;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
}

export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    cantidad: number;
}