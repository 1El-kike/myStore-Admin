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