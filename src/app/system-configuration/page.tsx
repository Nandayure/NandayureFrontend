import Image from 'next/image';

export default function SystemConfigurationPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 sm:pt-8 md:pt-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Administración de Catálogos
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
      <p className="text-lg text-gray-600 max-w-2xl text-center">
        Administra los catálogos de tu sistema de manera sencilla y eficiente. A través de esta sección podrás
        configurar los catálogos de tu sistema, como los tipos de documentos, cargos, departamentos, y más.
      </p>
    </div>
  );
}
