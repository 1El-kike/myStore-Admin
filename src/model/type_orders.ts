import { TypeDefaultcreateOrder } from "../interface/typeOrders";

export const Form_orders:TypeDefaultcreateOrder = {
    defaultValues: {
        customer: null,
        timeOrder: null,
      //  numberOrder: null,
      city: null,
      address: null,
      state:null,
      zipcode:null,
      TaxID: null,
      userId:null,
      items:[
        {
        productId:null,
        quantity:1,
        price:null
    }]
    }
  }