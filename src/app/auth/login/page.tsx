"use client"

import Image from "next/image"
import LoginForm from "@/components/auth/login/login-form"
import { titleFont } from "@/lib/fonts"
import BackgroundDecoration from "@/components/auth/background-decoration"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/MunicipalidadLogin.jpg"
          alt="Municipalidad Login"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 relative overflow-hidden">
        <BackgroundDecoration />
        <div className="w-full max-w-md relative z-10">
          <div className="space-y-6 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
            <h1 className={`${titleFont.className} text-center text-2xl font-bold tracking-tight text-gray-900`}>
              Inicio de sesión
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}

