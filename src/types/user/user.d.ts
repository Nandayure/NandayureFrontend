export interface User {
  userId: string;
  enabled: 0 | 1;
  name: string;
  surname1: string;
  surname2: string;
  email: string;
  cellPhone: string;
}

export type ActiveUser = Extract<User, { enabled: 1 }>;
export type InactiveUser = Extract<User, { enabled: 0 }>;

export interface ChangeUserStatus {
  id: string,
  status: boolean
}