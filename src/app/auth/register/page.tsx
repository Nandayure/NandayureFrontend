import RegisterForm from '@/components/auth/register/register-form';
import { titleFont } from '@/lib/fonts';

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full border shadow rounded-sm max-w-4xl px-6 py-8">
        <h5
          className={`${titleFont.className} text-center text-lg sm:text-2xl font-bold tracking-tight text-gray-900 mb-6`}
        >
          Registro de usuario
        </h5>
        <RegisterForm />
      </div>
    </main>
  );
}
