export interface AvailableUserResponse {
  data: AvailableUser[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AvailableUser {
  id: string;
  enabled: boolean;
  deletedAt: string | null;
  Employee: {
    id: string;
    Name: string;
    Surname1: string;
    Surname2: string;
    Email: string;
    JobPosition: {
      Name: string;
    };
  };
  Roles: Role[];
}

export interface Role {
  id: number;
  RoleName: string;
  Description: string;
}

export interface GetUsersQueryParams {
  name?: string;
  id?: string;
  enabled?: number; 
  page?: number;
  limit?: number;
}

export interface ChangeUserStatus {
  id: string;
  status: boolean;
}
