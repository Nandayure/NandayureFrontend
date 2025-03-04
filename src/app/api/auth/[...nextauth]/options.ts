import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        EmployeeId: {
          label: "Identificacion",
          type: "text",
          placeholder: "5-5555-5555",
        },
        Password: { label: "Contraseña", type: "password" },
      },
      
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              EmployeeId: credentials?.EmployeeId,
              Password: credentials?.Password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        
        console.log("Respuesta del servidor:", user);
        
        if (res.ok && user) {
        
          return {
            ...user,
            isBirthday: user.isBirthday === true
          };
        }
        if (user.message) {
          throw new Error(user.message);
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    
    async jwt({ token, user }) {
      console.log("Usuario en jwt callback:", user);
      if (user) {
      
        return { 
          ...token, 
          ...user, 
          isBirthday: user.isBirthday === true
        };
      }
      return token;
    },
    
    async session({ session, token }) {
      console.log("Token en session callback:", token);
      session.user = {
        ...(token as any),
        
        isBirthday: token.isBirthday === true,
      };
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

