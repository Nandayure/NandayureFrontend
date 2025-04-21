export interface Role {
  id: number;
  RoleName: 'USER' | 'TI' | 'RH' | 'VA' | 'DEPARTMENT_HEAD';
  Description: string;
}

export interface Roles extends Array<Role> {}

export interface AddRoleToUser {
  userId: number;
  roleId: number;
}

export interface RemoveRoleToUser {
  userId: number;
  roleId: number;
}