import Image from 'next/image';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="flex bg-white min-h-screen justify-center items-center">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <Image
            src={'/not-found-secondary.svg'}
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
            No podemos encontrar ese numero de solicitud. Encontrarás muchas
            cosas para explorar en la página principal.
          </p>
          <Link href={'/request-management'} className="flex justify-center">
            <button
              type="submit"
              className="block w-3/4 justify-center px-3 py-2 sm:py-3 mt-4 text-white bg-apple-500 rounded-md shadow-sm hover:bg-apple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
              Regresar
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
