import { UserModel } from "../module/auth/core/_models";

export const getRole = (currentUser: UserModel | undefined) => {
  //validacion para saber que role tiene el usuario
  function hasExactRole(roles: string[], target: string): boolean {
    return roles.includes(target);
  }
  const admin = hasExactRole([currentUser?.role] as string[], "ADMIN");
  const super_admin = hasExactRole(
    [currentUser?.role] as string[],
    "SUPER_ADMIN"
  );
  const employee = hasExactRole([currentUser?.role] as string[], "EMPLOYEE");

  return {
    admin,
    super_admin,
    employee,
  };
};
