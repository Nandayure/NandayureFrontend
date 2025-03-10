import EmployeeRegistrationForm from "@/components/auth/register/employee-registration-form";

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Registro de Empleados</h1>
      <div className="max-w-3xl mx-auto">
        <EmployeeRegistrationForm />
      </div>
    </main>
  )
}

