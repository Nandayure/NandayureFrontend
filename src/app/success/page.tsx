import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <section className="flex bg-white min-h-screen justify-center items-center">
      <div className="py-5 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <Image
            src={'/Success.svg'}
            alt="Developer"
            width={350}
            height={350}
            className="mx-auto"
          />
          <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-primary-600">
            ¡Listo!
          </h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">
            Todo ha salido bien
          </p>
        </div>
        <Link href={'/'} className="flex justify-center">
          <Button variant="select" size="lg">
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </section>
  );
}
