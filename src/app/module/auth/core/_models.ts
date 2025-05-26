export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface UserModel {
  id: number;
  name: string | number;
  password: string;
  iphone: number;
  image: string;
  Role: string;
  auth?: AuthModel;
}
