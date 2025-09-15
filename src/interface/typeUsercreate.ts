type UserCreate = {
  name: string;
  email: string;
  country: string;
  roleName: string;
  iphone: number | null;
  role: string; // Cambiado a string único
  image: File[]; // Cambiado a FileList para validación nativa
  password: string;
  storeId: number[];
};

export interface TypeDefaultUserCreate {
  defaultValues: UserCreate;
}
