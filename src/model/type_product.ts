import { TypeCategory } from "../interface/TypeCategory"

export const textProdct:string = 'Add new products and everything related to your supplier and your saleAdd new products and everything related '

export const categoryProduct:TypeCategory = {
    option: [
      {category: "Food",
        tipos: [
         {tipo:"Bebidas"},
         {tipo:"Cakes"},
         {tipo:"Carnicos"},
         {tipo:"Vegetales"},
         {tipo:"Dulce"},
         {tipo:"Lacteos"},
         {tipo:"Procesados"},
         {tipo:"Helados"},
         {tipo:"Ingredientes"},
        ],
      },
      {category:"Clothes",
        tipos:[
          {tipo:"Shoes"},
          {tipo:"Shirt"},
          {tipo:"Pants"},
          {tipo:"hat"},
          {tipo:"calzones"},
          {tipo:"Prendas"},
          {tipo:"Cintos"},
          {tipo:""}
     ]
      },
      {category:"Para Hogar",
        tipos:[
          {tipo:"Aseo y Limpieza"},
          {tipo:"barro"},
          {tipo:"Pants"},
          {tipo:"hat"},
          {tipo:"calzones"},
          {tipo:"Prendas"},
          {tipo:"Cintos"},
          {tipo:"Enguatadas"}
        ]
      },
      {category:"Jeweler",
        tipos:[
          {tipo:"Shoes"},
          {tipo:"Shirt"},
          {tipo:"Pants"},
          {tipo:"hat"},
          {tipo:"calzones"},
          {tipo:"Prendas"},
          {tipo:"Cintos"},
          {tipo:"Enguatadas"}
        ]
      },
    ],
  }

export const Form_product:any = {
    defaultValues: {
      id:null,
      name:null,
    description: null,
    category: null,
    tipo: null,
    quantity_total: null,
    sku:null,
    image: null,
    price: null,       
    selling_type: null,
    items_weight:null,
    length:null,
    breadth:null,
    status:Boolean,
    comparePrice:null,
    width:null
    }
  } 