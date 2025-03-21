'use client';
import Image from 'next/image';

export default function ErrorPage() {
  return (
    <section className="flex bg-white min-h-screen justify-center items-center">
      <div className="py-5 px-4 mx-auto max-w-(--breakpoint-xl) lg:py-16 lg:px-6">
        <div className="mx-auto max-w-(--breakpoint-sm) text-center">
          <Image
            src={'/Error.svg'}
            alt="Developer"
            width={350}
            height={350}
            className="mx-auto"
          />
          <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-7xl text-primary-600">
            404
          </h1>
          <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-3xl">
            Ups, Lo sentimos!!
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Ocurrió un error inesperado. Contacta al administrador.
          </p>
        </div>
      </div>
    </section>
  );
}
