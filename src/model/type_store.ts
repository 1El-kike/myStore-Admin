export const Form_stores:any = {
    defaultValues: {
      name:null,
    description: null,
    address: null,
    phone: null,
    phone2: null,
    tipo:null,
    email:null,
    isOpen: null,
    code:null,
    imgfondo: null,
    imgStore:null,
    imgPortada: null,       
    timeInitial: null,
    timeEnd:null,
    selling_type:null,
    promedioDescuento:null,
    promedioProduct:null,
    website_admin:null,
    }
  }
  
  import { TypeCategory } from "../interface/TypeCategory";

export const categoryStore:TypeCategory =  {
    option: [
      {category: "$ 200",
        tipos: [
         {tipo:"1%"},
         {tipo:"2%"},
         {tipo:"3%"},
         {tipo:"4%"},
         {tipo:"5%"},
         {tipo:"6%"},
         {tipo:"7%"},
         {tipo:"8%"},
         {tipo:"9%"},
        ],
      },
      {category:"$ 450",
        tipos:[
          {tipo:"2%"},
          {tipo:"4%"},
          {tipo:"8%"},
          {tipo:"10%"},
          {tipo:"12%"},
         
     ]
      },
      {category:"$ 850",
        tipos:[
          {tipo:"3%"},
          {tipo:"6%"},
          {tipo:"12%"},
          {tipo:"16%"},
          {tipo:"18%"},
         
        ]
      },
      {category:"$ 1200",
        tipos:[
          {tipo:"4%"},
          {tipo:"10%"},
          {tipo:"12%"},
          {tipo:"15%"},
          {tipo:"16%"},
          {tipo:"18%"},
          {tipo:"21%"},
        ]
      },
    ],
  }