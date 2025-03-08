import "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface User {
    employeeId: number;
    name: string;
    surname1: string;
    surname2: string;
    email: string;
    access_token: string;
    isBirthday?: boolean;
  }
  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    employeeId: number;
    name: string;
    surname1: string;
    surname2: string;
    email: string;
    access_token: string;
    isBirthday?: boolean;
  }
}
