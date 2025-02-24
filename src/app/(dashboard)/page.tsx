"use client"

import Chatbot from "@/components/dashboard/chat-bot/chat-bot"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center pt-2 sm:pt-6 md:pt-10">
      <div className="w-full max-w-2xl text-center px-4">
        <Image
          src="/hr.svg"
          alt="Recursos Humanos"
          width={300}
          height={300}
          className="mx-auto mb-6 w-3/4 sm:w-1/2 max-w-[300px]"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Bienvenido al Sistema de Gestión de RRHH</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Este sistema integral centraliza la gestión de recursos humanos para la Municipalidad de Nandayure,
          optimizando y automatizando todos los procesos clave del departamento. Acceda a los diferentes módulos a
          través del menú de navegación para gestionar personal, nóminas, asistencias y más.
        </p>
      </div>
      <Chatbot />
    </div>
  )
}

