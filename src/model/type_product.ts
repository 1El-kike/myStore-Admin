interface tipo{
  tipo:string
}

interface Option {
    category: string;
    tipos: tipo[];
}

export interface TypeCategory {
    option: Option[];
}
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
          {tipo:"Enguatadas"}
     ]
      },
      {category:"Artesanales",
        tipos:[
          {tipo:"Artesania"},
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