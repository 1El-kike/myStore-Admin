export interface FormData {
    name?: string;
    description?: string;
    category?: string;
    tipo?: string;
    quantity?: number;
    sku?:string,
    image?: string;
    price?: number;
    inventoryStatus?: string;
    cantidad?: number;
    // tipo de venta 0 => solo en linea Solo venta en tienda
    //               1 => Solo venta en línea
    //               2 => Disponible tanto en la tienda como en línea
    selling_type?:number | undefined;
    items_weight?:string;
    campo?:boolean;
    error?:string;
  }