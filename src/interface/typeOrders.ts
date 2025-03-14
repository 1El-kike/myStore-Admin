export interface TypeDefaultcreateOrder {
  defaultValues: TypeOrders;
}

export interface TypeOrders {
  id?: number;
  timeOrder: string | null;
  // numberOrder: string  | null,
  city: string | null;
  address: string | null;
  state: string | null;
  zipcode: string | null;
  discount: number | null;
  TaxID: string | null;
  taxrate: number | null;
  shipping:number | null;
  userId: number | null;
  items: Array<{
    productId: string | null;
    quantity: number;
    price: number | null;
  }>;
}
