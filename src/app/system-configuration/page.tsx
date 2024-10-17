import Image from 'next/image';

export default function SystemConfigurationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Configuración general del sistema
      </h1>
      <div className="relative w-full aspect-video max-w-4xl mx-auto mb-8">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9933427_4300578-98fIuTV7KR9gIMVsytLnhwUi3L5L0E.svg"
          alt="Ilustración de configuración del sistema"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <p className="text-xl text-gray-600 max-w-2xl text-center">
        Bienvenido a la página de configuración general del sistema. Aquí podrás
        ajustar las preferencias y opciones principales de tu aplicación.
      </p>
    </div>
  );
}
