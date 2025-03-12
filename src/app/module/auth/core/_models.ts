export interface AuthModel {
    api_token: string
    refreshToken?: string
  }

export interface UserModel {
    id: number
    name: string | number;
    password: string ;
    iphone: number;
    Role: string
    auth?: AuthModel;
  }
