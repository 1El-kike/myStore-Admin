import { useAuth } from "../app/module/auth/core/Auth";
import { TypeDefaultUserCreate } from "../interface/typeUsercreate";

export const Form_user: TypeDefaultUserCreate = {
  defaultValues: {
    name: "",
    email: "",
    role: "",
    country: "",
    iphone: null,
    roleName: "",
    image: undefined as any,
    password: "",
    storeId: [],
  },
};
