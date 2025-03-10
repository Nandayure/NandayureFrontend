import BackgroundDecoration from "@/components/auth/background-decoration";
import EmployeeRegistrationForm from "@/components/auth/register/employee-registration-form";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background decoration - full width and height */}
      <BackgroundDecoration />

      {/* Content container with width constraints */}
      <main className="container relative z-10 mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Registro de Empleados</h1>
        <div className="max-w-3xl mx-auto">
          <EmployeeRegistrationForm />
        </div>
      </main>
    </div>
  )
}

