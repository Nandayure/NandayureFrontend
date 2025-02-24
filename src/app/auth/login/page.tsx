'use client';
import Image from 'next/image';
import LoginForm from '@/components/auth/login/login-form';
import { titleFont } from '@/lib/fonts';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/MunicipalidadLogin.jpg"
          alt="Municipalidad Login"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="brightness-75"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
            <h1 className={`${titleFont.className} text-center mb-6 text-2xl font-bold tracking-tight text-gray-900`}>
              Inicio de sesión
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
