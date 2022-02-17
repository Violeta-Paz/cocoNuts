import { IProducto } from "./productos.interface";

export interface IPedidos{
    nombre: string,
    contacto: number,
    fechaPedido: Date,
    fechaRetiro: Date,
    pagado: string,
    total: number,
    productos: Array<string>,
    observaciones: string,
    entregado: boolean
}