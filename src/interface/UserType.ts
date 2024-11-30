export interface UserType {
    iphone: string;
    name:string;
    role?:string;
    tarrjeta?:string;
  }
  
  export interface User {
    user:UserType ,
    token:string
  }
  
  export interface AuthContextType {
    user: User | null;
    login:(user:UserType,token:string)=> void;
    logout : () => void;
  }

  export interface useBack {
    userclient:{
      0:{name:string;
      iphone:string}
    },
    token:string
  }