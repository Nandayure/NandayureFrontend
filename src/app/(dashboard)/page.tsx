'use client';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="max-w-2xl text-center">
      <Image 
        src="/hr.svg" 
        alt="Recursos Humanos" 
        width={300} 
        height={300} 
        className="mx-auto mb-8"
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Bienvenido al Sistema de Gestión de RRHH
      </h1>
      <p className="text-xl text-gray-600">
        Este sistema integral centraliza la gestión de recursos humanos para la Municipalidad de Nandayure, 
        optimizando y automatizando todos los procesos clave del departamento. Acceda a los diferentes 
        módulos a través del menú de navegación para gestionar personal, nóminas, asistencias y más.
      </p>
    </div>
  </div>
  );
}
