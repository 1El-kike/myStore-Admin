export interface TypeStore {
    id?: number,
  name: string | null,
  code: string | null,
  description: string  | null,
  address: string | null,
  phone: string | null,
  phone2: string | null,
  tipo: string | null,
  email: string | null,
  isOpen: true | null,
  imgfondo: string | null,
  imgStore: string | null,
  imgPortada:string | null,
  timeInitial: string | null,
  timeEnd: string | null,
  selling_type: string | null,
  promedioDescuento: string | null,
  promedioProduct: string | null,
  rating?: number | null
  website_admin:string | null
}

export interface TypeDefaultStore {
  defaultValues:TypeStore
}