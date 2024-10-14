import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      employeeId: number;
      name: string;
      surname1: string;
      surname2: string;
      email: string;
      access_token: string;
    };
  }
}
