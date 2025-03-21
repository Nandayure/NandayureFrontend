import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function SessionExpired() {
  return (
    <section className="flex bg-white min-h-screen justify-center items-center">
      <div className="py-5 px-4 mx-auto max-w-(--breakpoint-xl) lg:py-16 lg:px-6">
        <div className="mx-auto max-w-(--breakpoint-sm) text-center">
          <Image
            src="/session-expired.svg"
            alt="Session Expired"
            width={350}
            height={350}
            className="mx-auto"
          />

          <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-primary-600">Sesión Expirada</h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">¡Tu sesión ha expirado!</p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Por motivos de seguridad, tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar.
          </p>
          <Link href="/auth/login" className="flex justify-center">
            <Button
              type="submit"
              className="block w-3/4 justify-center px-3 py-2 sm:py-3 mt-4 text-white bg-apple-500 rounded-md shadow-xs hover:bg-apple-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

