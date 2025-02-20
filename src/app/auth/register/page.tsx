import RegisterForm from "@/components/auth/register/register-form"
import { titleFont } from "@/lib/fonts"

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-50">
      <div className="w-full max-w-4xl bg-white border shadow-lg rounded-lg p-8">
        <h1 className={`${titleFont.className} text-center text-2xl font-bold text-gray-900 mb-6`}>
          Registro de usuario
        </h1>
        <RegisterForm />
      </div>
    </main>
  )
}

