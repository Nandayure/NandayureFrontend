'use client';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// Carga dinámica del componente VacationCertificate
const VacationCertificate = dynamic(
  () => import('@/components/templates/Vacation-certificate/vacations'),
  { ssr: false }
);

type Params = {
  id: string;
};

export default function PdfPage() {
  const {id} = useParams<Params>()

  return (
    <>
      {/* Pasar `id` como prop al componente VacationCertificate */}
      <VacationCertificate id={id} />
    </>
  );
}
