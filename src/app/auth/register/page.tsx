import BackgroundDecoration from "@/components/auth/background-decoration";
import EmployeeRegistrationForm from "@/components/auth/register/employee-registration-form";
import { BackButton } from "@/components/ui/back-button";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background decoration - full width and height */}
      <BackgroundDecoration />

      {/* Content container with width constraints */}
      <main className="container relative z-10 mx-auto py-10">
        {/* Back button positioned correctly */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <BackButton 
            href="/" 
            label="Volver" 
            className="bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm" 
          />
        </div>
        
        {/* Main content with appropriate spacing from top to accommodate button */}
        <div className="pt-10 md:pt-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Registro de Empleados</h1>
          <div className="max-w-3xl mx-auto">
            <EmployeeRegistrationForm />
          </div>
        </div>
      </main>
    </div>
  )
}

