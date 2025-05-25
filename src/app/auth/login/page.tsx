"use client"

import Image from "next/image"
import LoginForm from "@/components/auth/login/login-form"
import { titleFont } from "@/lib/fonts"
import BackgroundDecoration from "@/components/auth/background-decoration"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left side - Image with overlay content */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/MunicipalidadLogin.jpg"
          alt="Municipalidad de Nandayure"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-[#34b1fd] rounded-full"></div>
              </div>
            </div>

            <h1 className={`${titleFont.className} text-4xl font-bold mb-4 leading-tight`}>
              Sistema Administrativo de Recursos Humanos
            </h1>

            <p className="text-lg text-gray-200 leading-relaxed">
              Plataforma integral para la gestión eficiente del talento humano de la Municipalidad de Nandayure.
              Administra empleados, permisos y procesos de recursos humanos de manera centralizada y segura.
            </p>

            <div className="mt-8 flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-[#34b1fd] rounded-full"></div>
              <span>Municipalidad de Nandayure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 relative overflow-hidden">
        <BackgroundDecoration />
        <div className="w-full max-w-md relative z-10">
          <div className="space-y-8 bg-white p-8 border border-gray-200 rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className={`${titleFont.className} text-3xl font-bold tracking-tight text-gray-900`}>Bienvenido</h2>
              <p className="text-sm text-gray-600">Ingresa tus credenciales para acceder al sistema</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  )
}
