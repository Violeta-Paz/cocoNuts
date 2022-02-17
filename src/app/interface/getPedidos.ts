
export interface GPedidos {
    id: string,
    fechaRetiro: Date,
    fechaPedido: Date,
    nombre: string
    contacto: number,
    pagado: boolean,
    total: number,
    observaciones: string,
    productos: Array<string>,
    entregado: boolean
}