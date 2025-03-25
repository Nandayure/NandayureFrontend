"use client"

import Image from "next/image"
import { useSession } from "next-auth/react"
import BirthdayEffect from "@/components/birthday/birthday-effect"
import { useBirthdayEffect } from "@/hooks/auth/birthday/useBirthdayEffect"
import Chatbot from "@/components/dashboard/chat-bot/chat-bot"
import { useGetRoles } from "@/hooks"

export default function HomePage() {
  const { data: session } = useSession()
  const { showEffect, setShowEffect } = useBirthdayEffect(2)
  const { roles } = useGetRoles()

  // Obtener el nombre del usuario de la sesión o usar un predeterminado
  const userName = session?.user?.name || "Usuario"

  // Función para obtener la descripción basada en los roles
  const getRoleDescription = () => {
    if (!roles || !Array.isArray(roles)) return "Bienvenido al sistema."

    if (roles.includes("RH")) {
      return "Como administrador de Recursos Humanos, tienes acceso completo a la gestión de personal, trámites y reportes administrativos. Puedes gestionar todos los aspectos relacionados con el personal de la Municipalidad."
    } else if (roles.includes("DEPARTMENT_HEAD")) {
      return "Como Jefe de Departamento,puedes aprobar solicitudes. Tu rol es fundamental para la coordinación efectiva de tu equipo."
    } else if (roles.includes("VA")) {
      return "Como Alcalde, tienes acceso a reportes  y gestión de solicitudes. Tu función es asegurar el buen funcionamiento de la Municipalidad."
    } else if (roles.includes("USER")) {
      return "Como Usuario, puedes realizar trámites personales, consultar información y acceder a los servicios básicos de la plataforma. Estamos aquí para atender tus necesidades."
    } else {
      return "Bienvenido al sistema. Por favor, contacta con el administrador si necesitas acceso a funcionalidades específicas."
    }
  }

  return (
    <div className="flex flex-col items-center justify-center pt-2 sm:pt-6 md:pt-10">
      {showEffect && <BirthdayEffect name={userName} onComplete={() => setShowEffect(false)} />}

      <div className="w-full max-w-2xl text-center px-4">
        <Image
          src="/hr.svg"
          alt="Recursos Humanos"
          width={300}
          height={300}
          className="mx-auto mb-6 w-3/4 sm:w-1/2 max-w-[300px]"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Plataforma Integral de Recursos Humanos</h1>

        <h2 className="text-xl font-medium text-primary mb-4">Bienvenido, {userName}</h2>

        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{getRoleDescription()}</p>
      </div>
      <Chatbot />
    </div>
  )
}

