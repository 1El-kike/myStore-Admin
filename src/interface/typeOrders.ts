export interface TypeDefaultcreateOrder {
  defaultValues: TypeOrders;
}

export interface TypeOrders {
  id?: number;
  customer: string | null;
  timeOrder: string | null;
  // numberOrder: string  | null,
  city: string | null;
  address: string | null;
  state: string | null;
  zipcode: string | null;
  TaxID: string | null;
  userId: number | null;
  items: Array<{
    productId: string | null;
    quantity: number;
    price: number | null;
  }>;
}
